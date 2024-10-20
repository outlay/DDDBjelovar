import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Reservation {
    id: number;
    name: string;
    home: string;
    date: string;
    signed: boolean;
}

const Potpisi: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([
        {
            id: 1,
            name: "Rezervacija #1",
            home: "Dom I MO HRGOVLJANI",
            date: "28-10-2024 - 29-10-2024",
            signed: false,
        },
        {
            id: 2,
            name: "Rezervacija #2",
            home: "Dom I MO GUDOVAC",
            date: "28-10-2024 - 01-11-2024",
            signed: false,
        },
        {
            id: 3,
            name: "Rezervacija #3",
            home: "Dom I MO GUDOVAC",
            date: "05-11-2024 - 06-11-2024",
            signed: false,
        },
    ]);

    const handleSign = (reservationId: number) => {
        setReservations(prevReservations =>
            prevReservations.map(reservation =>
                reservation.id === reservationId ? { ...reservation, signed: true } : reservation
            )
        );
    };

    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Potpisi za rezervacije</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Naziv rezervacije</TableHead>
                                <TableHead>Društveni dom</TableHead>
                                <TableHead>Datum</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Akcija</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reservations.map(reservation => (
                                <TableRow key={reservation.id}>
                                    <TableCell>{reservation.name}</TableCell>
                                    <TableCell>{reservation.home}</TableCell>
                                    <TableCell>{reservation.date}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={reservation.signed ? "default" : "destructive"}
                                        >
                                            {reservation.signed ? "Potpisano" : "Čeka potpis"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleSign(reservation.id)}
                                            disabled={reservation.signed}
                                        >
                                            {reservation.signed ? "Potpisano" : "Potpiši"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Potpisi;
