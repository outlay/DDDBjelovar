// HomePage.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import HeroImage from "@/assets/hero.png";
import { DateRange } from "react-day-picker";
import HomeCombo from "@/components/home/HomeCombo";
import DateRangeSelector from "@/components/DateRangeSelector";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
    const navigate = useNavigate();

    const onSearch = () => {
        if (!dateRange) {
            return;
        }

        navigate("/domovi", {
            state: {
                dateRange,
            },
        });
    };

    return (
        <>
            <div className="relative h-[34rem] overflow-hidden">
                <img
                    src={HeroImage}
                    alt="Hero slika"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="min-h-36 bg-white py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">
                        Pretraži dostupne društvene domove
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
                        <HomeCombo />
                    </div>
                    <Button className="w-full mt-4" size="lg" onClick={onSearch}>
                        Pretraži
                    </Button>
                </div>
            </div>
        </>
    );
}
