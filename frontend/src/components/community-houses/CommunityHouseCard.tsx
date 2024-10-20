import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { CommunityHouseResponse } from "@/models/generated";
import { getAssetUrl } from "@/lib/utils";

interface CommunityHouseCardProps {
    house: CommunityHouseResponse;
}

const CommunityHouseCard: React.FC<CommunityHouseCardProps> = ({ house }) => {
    const navigate = useNavigate();

    const handleCheckReservation = () => {
        navigate(`/dom/${house.id}`);
    };

    const imageUrl = getAssetUrl(house.images?.[0]?.url || "") || "https://placehold.co/600x400";

    return (
        <Card className="w-[300px] rounded-lg overflow-hidden">
            <img src={imageUrl} alt={house.name} className="w-full h-40 object-cover" />
            <CardHeader>
                <CardTitle>{house.name}</CardTitle>
                <CardDescription>{house.address}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Kapacitet: {house.approxNumberOfOccupants}</p>
                <p>Kategorija: {house.category}</p>
                <p>Površina: {house.squaring} m²</p>
            </CardContent>
            <CardFooter>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Više informacija</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{house.name}</DialogTitle>
                            <DialogDescription>{house.address}</DialogDescription>
                        </DialogHeader>
                        <img
                            src={imageUrl}
                            alt={house.name}
                            className="w-full h-64 object-cover rounded-md"
                        />
                        <p>Kapacitet: {house.approxNumberOfOccupants}</p>
                        <p>Kategorija: {house.category}</p>
                        <p>Površina: {house.squaring} m²</p>
                        {house.cutleryRentAmountPerPerson && (
                            <p>Najam pribora po osobi: {house.cutleryRentAmountPerPerson} KM</p>
                        )}
                        {house.note && <p>Napomena: {house.note}</p>}
                        <Button className="mt-4" variant="default" onClick={handleCheckReservation}>
                            Provjera rezervacije
                        </Button>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};

export { CommunityHouseCard };
export type { CommunityHouseResponse };
