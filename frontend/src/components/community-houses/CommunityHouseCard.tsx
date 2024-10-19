import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface CommunityHouse {
    id: number;
    name: string;
    image: string;
    description: string;
    capacity: number;
    amenities: string[];
}

interface CommunityHouseCardProps {
    house: CommunityHouse;
}

const CommunityHouseCard: React.FC<CommunityHouseCardProps> = ({ house }) => {
    const navigate = useNavigate();

    const handleCheckReservation = () => {
        navigate(`/dom/${house.id}`);
    };

    return (
        <Card className="w-[300px] rounded-lg overflow-hidden">
            <img src={house.image} alt={house.name} className="w-full h-40 object-cover" />
            <CardHeader>
                <CardTitle>{house.name}</CardTitle>
                <CardDescription>{house.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Kapacitet: {house.capacity}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                    {house.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary">
                            {amenity}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Više informacija</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{house.name}</DialogTitle>
                            <DialogDescription>{house.description}</DialogDescription>
                        </DialogHeader>
                        <img
                            src={house.image}
                            alt={house.name}
                            className="w-full h-64 object-cover rounded-md"
                        />
                        <p>Kapacitet: {house.capacity}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {house.amenities.map((amenity, index) => (
                                <Badge key={index} variant="secondary">
                                    {amenity}
                                </Badge>
                            ))}
                        </div>
                        <Button className="mt-4" variant="default" onClick={handleCheckReservation}>
                            Provjera rezervacije
                        </Button>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};

export { CommunityHouseCard, type CommunityHouse };
