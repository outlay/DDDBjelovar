import * as React from "react";
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DateRangeSelector from "@/components/DateRangeSelector";
import { DateRange } from "react-day-picker";
import { useApp } from "@/routes/app-context";
import { useNavigate } from "react-router-dom";
import { Toast } from "@/components/ui/toast";
import AuthDialog from "@/components/auth/AuthDialog";
import { getAssetUrl } from "@/lib/utils";

const mockHouse = {
    id: 1,
    name: "I MO HRGOVLJANI",
    image: "/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL2JpdGhhY2svZHJ1c3R2ZW5pZG9tMS5qcGVnP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9VE5LWjVFN1E3NzFBRk0wUjEwNjMlMkYyMDI0MTAyMCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDEwMjBUMDkwMDEzWiZYLUFtei1FeHBpcmVzPTQzMTk5JlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKVVRrdGFOVVUzVVRjM01VRkdUVEJTTVRBMk15SXNJbVY0Y0NJNk1UY3lPVFExT0RBd015d2ljR0Z5Wlc1MElqb2lZV1J0YVc0aWZRLklTU1doblFxT1JON0hUNWJyWWFvN1BXT1g4TVExOU1paHdxYk9wbExzc3JDMEtvUGhLYnBrdWtHLWYxQ0Q0b1AzYjBNTV8zTWtOSFB3U2s2S2N6VE1nJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9MWMwMmJmZWItN2NiYS00MDk4LWFjZmYtODM1YTViMGViMGI4JlgtQW16LVNpZ25hdHVyZT00NmUxYTI2MDg4YjQxYzc4ZjVmMzc2NzBmOTc2YzZjMDIwOWRiOGE3ZWM1ZTI5Njc4ODZlZmQ4YjZiYzU4NGU2",
    description: "Prostrani dom, idealan za razne događaje i okupljanja.",
    capacity: 135,
    amenities: ["Audio oprema", "Kuhinja", "Wi-Fi", "Parking"],
    address: "Ulica Zrinska 2a, Bjelovar",
    squaring: 171.27,
    category: "Kat. 1",
    pricesPerPurpose: [
        {
            purposeName: "Vjenčanje",
            pricePerMeterSquare: 10,
        },
        {
            purposeName: "Rođendan",
            pricePerMeterSquare: 8,
        },
        {
            purposeName: "Promidžba",
            pricePerMeterSquare: 6,
        },
        {
            purposeName: "Karmine",
            pricePerMeterSquare: 5,
        },
    ],
    cutleryRentAmountPerPerson: 0.4,
    note: "PONEDJELJAK I SRIJEDA- NE IZNAJMLJIVATI",
    active: true,
    coordinates: {
        latitude: 45.897497,
        longitude: 16.847827,
    },
    nonWorkingDays: [
        {
            sifra: "1",
            opis: "UTORAK",
        },
        {
            sifra: "3",
            opis: "ČETVRTAK",
        },
    ],
};

const CommunityHouseDisplay: React.FC = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);
    const { jwtResponse } = useApp();
    const navigate = useNavigate();

    const handleReservation = () => {
        if (!dateRange || !dateRange.from || !dateRange.to) {
            Toast({
                title: "Odaberite datum",
                description: "Molimo odaberite datum za rezervaciju.",
                variant: "destructive",
            });
            return;
        }

        if (!jwtResponse) {
            setIsAuthDialogOpen(true);
        } else {
            navigate("/nova-rezervacija", { state: { dateRange, houseId: mockHouse.id } });
        }
    };

    const handleAuthDialogClose = () => {
        setIsAuthDialogOpen(false);
    };

    const url = getAssetUrl(mockHouse.image) || "https://placehold.co/600x400";

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8">
            <div className="md:w-1/2">
                <img
                    src={url}
                    alt={mockHouse.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h1 className="text-2xl font-bold mb-4">{mockHouse.name}</h1>
                <Accordion type="single" collapsible>
                    <AccordionItem value="description">
                        <AccordionTrigger>Opis</AccordionTrigger>
                        <AccordionContent>{mockHouse.description}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="address">
                        <AccordionTrigger>Adresa</AccordionTrigger>
                        <AccordionContent>{mockHouse.address}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="amenities">
                        <AccordionTrigger>Pogodnosti</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-wrap gap-2">
                                {mockHouse.amenities.map((amenity, index) => (
                                    <Badge key={index}>{amenity}</Badge>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="md:w-1/2">
                <Card>
                    <CardContent className="p-4">
                        <h2 className="text-xl font-semibold mb-4">Rezervacija</h2>
                        <div className="mb-4">
                            <p className="text-gray-600">Površina:</p>
                            <p className="text-lg">{mockHouse.squaring} m²</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600">Kapacitet:</p>
                            <p className="text-lg">{mockHouse.capacity} osoba</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600">Kategorija:</p>
                            <p className="text-lg">{mockHouse.category}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600 mb-2">Cijena po kvadratnom metru:</p>
                            <ul className="space-y-2">
                                {mockHouse.pricesPerPurpose.map((purpose, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{purpose.purposeName}:</span>
                                        <span className="font-semibold">
                                            {purpose.pricePerMeterSquare} kn/m²
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
                        <Button className="w-full mt-4" onClick={handleReservation}>
                            Rezerviraj
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <AuthDialog isOpen={isAuthDialogOpen} onClose={handleAuthDialogClose} />
        </div>
    );
};

export default CommunityHouseDisplay;
