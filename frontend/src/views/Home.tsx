// HomePage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import HeroImage from "@/assets/hero.png";
import { DateRange } from "react-day-picker";
import HomeCombo from "@/components/home/HomeCombo";
import DateRangeSelector from "@/components/DateRangeSelector";
import { useNavigate } from "react-router-dom";
import BjelovarMap from "@/components/BjelovarMap"; // Uvozimo komponentu mape
import { mockCommunityHomes } from "@/mocks/communityHomes"; // Uvozimo mock podatke
import { APIProvider } from "@vis.gl/react-google-maps";

export default function HomePage() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [selectedHome, setSelectedHome] = useState<string | null>(null);
    const [mapTarget, setMapTarget] = useState<google.maps.LatLngLiteral | null>(null);
    const navigate = useNavigate();

    const onSearch = () => {
        if (!dateRange) {
            return;
        }

        navigate("/domovi", {
            state: {
                dateRange,
                selectedHome,
            },
        });
    };

    const handleMarkerClick = (homeId: string) => {
        setSelectedHome(homeId);
        const home = mockCommunityHomes.find(h => h.id === homeId);
        if (home) {
            setMapTarget(home.location);
        }
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
                        <HomeCombo />
                    </div>
                    <Button className="w-full mb-8" size="lg" onClick={onSearch}>
                        Pretraži
                    </Button>

                    {/* Dodajemo mapu */}
                    <div className="h-[400px] mb-8">
                        <APIProvider apiKey="AIzaSyAr8Qg6ruRmvFfuy1mOtgWfrAYYGlWSmyE">
                            <BjelovarMap
                                homes={mockCommunityHomes}
                                mapTarget={mapTarget}
                                onMarkerClick={handleMarkerClick}
                            />
                        </APIProvider>
                    </div>

                    {selectedHome && (
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-semibold">
                                Odabrani dom:{" "}
                                {mockCommunityHomes.find(h => h.id === selectedHome)?.name}
                            </h3>
                            {/* Ovdje možete dodati više detalja o odabranom domu */}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
