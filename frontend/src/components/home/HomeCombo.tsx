"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const homes = [
    { label: "Dom 1", value: "dom1" },
    { label: "Dom 2", value: "dom2" },
    { label: "Dom 3", value: "dom3" },
    // Add more homes as needed
];
const HomeCombo = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? homes.find(home => home.value === value)?.label : "Odaberi dom..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Pretraži domove..." />
                    <CommandList>
                        <CommandEmpty>Nema pronađenih domova.</CommandEmpty>
                        <CommandGroup>
                            {homes.map(home => (
                                <CommandItem
                                    key={home.value}
                                    value={home.value}
                                    onSelect={currentValue => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === home.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {home.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default HomeCombo;
