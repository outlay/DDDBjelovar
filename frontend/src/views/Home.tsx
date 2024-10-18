import { useState } from "react";
import { CalendarIcon, CheckIcon, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import HeroImage from "@/assets/hero.png";

const homes = [
    { label: "Dom 1", value: "dom1" },
    { label: "Dom 2", value: "dom2" },
    { label: "Dom 3", value: "dom3" },
    // Dodajte više domova po potrebi
];

export default function HomePage() {
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [open, setOpen] = useState(false);
    const [selectedHome, setSelectedHome] = useState("");

    return (
        <>
            <div className="relative h-[34rem] overflow-hidden">
                <img
                    src={HeroImage}
                    alt="Hero slika"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="min-h-36 bg-white py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-8">
                        Pretraži dostupne društvene domove
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !dateFrom && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateFrom ? format(dateFrom, "PPP") : <span>Od datuma</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={dateFrom}
                                    onSelect={setDateFrom}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !dateTo && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateTo ? format(dateTo, "PPP") : <span>Do datuma</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={dateTo} initialFocus />
                            </PopoverContent>
                        </Popover>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                >
                                    {selectedHome
                                        ? homes.find(home => home.value === selectedHome)?.label
                                        : "Odaberi dom"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Pretraži domove..." />
                                    <CommandEmpty>Nema pronađenih domova.</CommandEmpty>
                                    <CommandGroup>
                                        {homes.map(home => (
                                            <CommandItem
                                                key={home.value}
                                                onSelect={currentValue => {
                                                    setSelectedHome(
                                                        currentValue === selectedHome
                                                            ? ""
                                                            : currentValue
                                                    );
                                                    setOpen(false);
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedHome === home.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {home.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button className="w-full mt-4" size="lg">
                        Pretraži
                    </Button>
                </div>
            </div>
        </>
    );
}
