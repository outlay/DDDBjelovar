import React, { useEffect, useState } from "react";
import { CommunityHouseCard } from "@/components/community-houses/CommunityHouseCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import DateRangeSelector from "@/components/DateRangeSelector";
import { DateRange } from "react-day-picker";
import { CommunityHouseResponse } from "@/models/generated";
import { apiClient } from "@/lib/api-client";

const CommunityHouses: React.FC = () => {
    const [selectedCapacity, setSelectedCapacity] = useState<number | null>(null);
    const [communityHouses, setCommunityHouses] = useState<CommunityHouseResponse[]>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const filteredHouses = communityHouses?.filter(house => {
        if (selectedCapacity && house.approxNumberOfOccupants !== selectedCapacity) {
            return false;
        }

        return true;
    });

    useEffect(() => {
        apiClient.get<CommunityHouseResponse[]>("/community-houses").then(response => {
            setCommunityHouses(response as unknown as CommunityHouseResponse[]);
        });
    }, []);

    if (!communityHouses?.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 flex">
            <div className="flex-grow px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {communityHouses.map(house => (
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
                            <Select>
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
