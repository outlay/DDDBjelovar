import { MyReservationDataTable } from "@/components/reservations/my-reservations-data-table";
import { resColumns, ReservationColumn } from "@/models/columns/my-reservation-columns";

const MyReservations = () => {
    const reservations: ReservationColumn[] = [
        { id: "1", name: "Rezervacija #1", status: "U procesu" },
        { id: "2", name: "Rezervacija #2", status: "Potvrđena" },
        { id: "3", name: "Rezervacija #3", status: "Otkazana" },
    ];

    return (
        <div>
            <h1 className="p-6 font-semibold text-2xl">Moje rezervacije</h1>
            <MyReservationDataTable columns={resColumns} data={reservations} />
        </div>
    );
};

export default MyReservations;
