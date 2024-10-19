import React, { useState } from "react";
import {
    CommunityHouse,
    CommunityHouseCard,
} from "@/components/community-houses/CommunityHouseCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import DateRangeSelector from "@/components/DateRangeSelector";
import { DateRange } from "react-day-picker";

// Pretpostavimo da imamo neke podatke o društvenim domovima
const communityHouses: CommunityHouse[] = [
    {
        id: 1,
        name: "Dom Kulture",
        image: "https://picsum.photos/id/641/800/800",
        description: "Prostrani dom kulture u centru grada",
        capacity: 200,
        amenities: ["Pozornica", "Audio oprema", "Kuhinja"],
    },
    {
        id: 2,
        name: "Sportska Dvorana",
        image: "https://picsum.photos/id/213/800/800",
        description: "Moderna sportska dvorana s više terena",
        capacity: 500,
        amenities: ["Košarkaški teren", "Odbojkaški teren", "Svlačionice"],
    },
    {
        id: 3,
        name: "Dom Kulture",
        image: "https://picsum.photos/id/642/800/800",
        description: "Prostrani dom kulture u centru grada",
        capacity: 200,
        amenities: ["Pozornica", "Audio oprema", "Kuhinja"],
    },
    {
        id: 4,
        name: "Sportska Dvorana",
        image: "https://picsum.photos/id/211/800/800",
        description: "Moderna sportska dvorana s više terena",
        capacity: 500,
        amenities: ["Košarkaški teren", "Odbojkaški teren", "Svlačionice"],
    },
];

const CommunityHouses: React.FC = () => {
    const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const filteredHouses = communityHouses.filter(house => {
        if (selectedCapacity && house.capacity.toString() !== selectedCapacity) {
            return false;
        }
        // TODO: Implement date availability filtering
        return true;
    });

    return (
        <div className="p-4 flex">
            <div className="flex-grow px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredHouses.map(house => (
                        <CommunityHouseCard key={house.id} house={house} />
                    ))}
                </div>
            </div>
            <div className="ml-4 w-64 sticky top-4 self-start">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Filteri</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium mb-2">Kapacitet</h3>
                            <Select
                                onValueChange={value =>
                                    setSelectedCapacity(value === "all" ? null : value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Odaberi kapacitet" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Svi kapaciteti</SelectItem>
                                    <SelectItem value="200">200</SelectItem>
                                    <SelectItem value="500">500</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-2">Datum dostupnosti</h3>
                            <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityHouses;
