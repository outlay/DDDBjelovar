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
import { apiClient } from "@/lib/api-client";
import { CommunityHouseResponse } from "@/models/generated";

const HomeCombo = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [communityHouses, setCommunityHouses] = React.useState<CommunityHouseResponse[]>([]);

    React.useEffect(() => {
        apiClient.get<CommunityHouseResponse[]>("/community-houses").then(response => {
            setCommunityHouses(response as unknown as CommunityHouseResponse[]);
        });
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? communityHouses.find(home => home.id?.toString() === value)?.name
                        : "Odaberi dom..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Pretraži domove..." />
                    <CommandList>
                        <CommandEmpty>Nema pronađenih domova.</CommandEmpty>
                        <CommandGroup>
                            {communityHouses.map(home => (
                                <CommandItem
                                    key={home.id}
                                    value={home.id?.toString()}
                                    onSelect={currentValue => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === home.id?.toString()
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {home.name}
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
