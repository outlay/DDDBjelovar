import React, { useState } from "react";
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

// Mock data for a community house
const mockHouse = {
    id: 1,
    name: "Dom Kulture",
    image: "https://picsum.photos/id/641/800/600",
    description: "Prostrani dom kulture u centru grada, idealan za razne događaje i okupljanja.",
    capacity: 200,
    amenities: ["Pozornica", "Audio oprema", "Kuhinja", "Wi-Fi", "Parking"],
    address: "Trg bana Jelačića 1, 10000 Zagreb",
    pricePerDay: 500,
};

const CommunityHouseDisplay: React.FC = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8">
            <div className="md:w-1/2">
                <img
                    src={mockHouse.image}
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
                        <p className="mb-2">Kapacitet: {mockHouse.capacity} osoba</p>
                        <p className="mb-4">Cijena po danu: {mockHouse.pricePerDay} kn</p>
                        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
                        <Button className="w-full mt-4">Rezerviraj</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CommunityHouseDisplay;
