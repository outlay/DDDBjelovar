import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

interface DateRangeSelectorProps {
    dateRange: DateRange | undefined;
    setDateRange: (dateRange: DateRange | undefined) => void;
}

export default function DateRangeSelector({ dateRange, setDateRange }: DateRangeSelectorProps) {
    return (
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
                <Calendar mode="range" selected={dateRange} onSelect={setDateRange} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
