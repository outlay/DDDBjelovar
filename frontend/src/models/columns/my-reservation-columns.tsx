import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export type ReservationColumn = {
    id: string;
    name: string;
    status: "U procesu" | "Potvrđena" | "Otkazana";
};

export const resColumns: ColumnDef<ReservationColumn>[] = [
    {
        accessorKey: "name",
        header: "Reservation",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as ReservationColumn["status"];
            return <Badge variant={getBadgeVariant(status)}>{status}</Badge>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <Link to={`/rezervacije/${row.original.id}`}>
                    <ArrowRight className="h-4 w-4 text-gray-500" />
                </Link>
            );
        },
    },
];

function getBadgeVariant(
    status: ReservationColumn["status"]
): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
        case "U procesu":
            return "secondary";
        case "Potvrđena":
            return "default";
        case "Otkazana":
            return "destructive";
        default:
            return "outline";
    }
}
