import React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import HeroImage from "@/assets/hero.png";
import { DateRange } from "react-day-picker";
import HomeCombo from "@/components/combobox/HomeCombo";

export default function HomePage() {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !dateRange?.from && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateRange?.from ? (
                                        <span>
                                            {format(dateRange.from, "PP")} -{" "}
                                            {dateRange.to ? format(dateRange.to, "PP") : "..."}
                                        </span>
                                    ) : (
                                        <span>Odaberi raspon datuma</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="range"
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <HomeCombo />
                    </div>
                    <Button className="w-full mt-4" size="lg">
                        Pretraži
                    </Button>
                </div>
            </div>
        </>
    );
}
