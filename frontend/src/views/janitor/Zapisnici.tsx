import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Reservation {
    id: number;
    name: string;
    home: string;
    date: string;
    images: string[];
}

const Zapisnici: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([
        {
            id: 1,
            name: "Rezervacija #1",
            home: "Dom I MO HRGOVLJANI",
            date: "28-10-2024 - 29-10-2024",
            images: [],
        },
        {
            id: 2,
            name: "Rezervacija #2",
            home: "Dom I MO GUDOVAC",
            date: "28-10-2024 - 01-11-2024",
            images: [],
        },
        {
            id: 3,
            name: "Rezervacija #3",
            home: "Dom I MO GUDOVAC",
            date: "05-11-2024 - 06-11-2024",
            images: [],
        },
    ]);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>, reservationId: number) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setReservations(prevReservations =>
                prevReservations.map(reservation =>
                    reservation.id === reservationId
                        ? { ...reservation, images: [...reservation.images, ...newImages] }
                        : reservation
                )
            );
        }
    };

    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Zapisnici</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Naziv rezervacije</TableHead>
                                <TableHead>Društveni dom</TableHead>
                                <TableHead>Datum</TableHead>
                                <TableHead>Akcije</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reservations.map(reservation => (
                                <TableRow key={reservation.id}>
                                    <TableCell>{reservation.name}</TableCell>
                                    <TableCell>{reservation.home}</TableCell>
                                    <TableCell>{reservation.date}</TableCell>
                                    <TableCell>
                                        <Input
                                            type="file"
                                            multiple
                                            onChange={e => handleUpload(e, reservation.id)}
                                            accept="image/*"
                                            className="mb-2"
                                        />
                                        <div className="grid grid-cols-3 gap-2">
                                            {reservation.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`Uploaded ${index + 1}`}
                                                    className="w-full h-20 object-cover rounded"
                                                />
                                            ))}
                                        </div>
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

export default Zapisnici;
