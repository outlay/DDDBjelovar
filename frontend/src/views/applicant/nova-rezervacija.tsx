import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
//import { TimePicker } from "@/components/ui/time-picker"; // Pretpostavljam da imate ovu komponentu

const formSchema = z.object({
    ime: z.string().min(2, "Ime mora imati barem 2 znaka"),
    prezime: z.string().min(2, "Prezime mora imati barem 2 znaka"),
    adresa: z.string().min(5, "Adresa mora imati barem 5 znakova"),
    grad: z.string().min(2, "Grad mora imati barem 2 znaka"),
    banka: z.string().min(2, "Naziv banke mora imati barem 2 znaka"),
    iban: z.string().regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/, "Neispravan IBAN format"),
    svrha: z.enum(["zabava", "politicke_stranke", "savjetovanje_predavanje", "sportske_priredbe"]),
    mjesniOdbor: z.string().min(2, "Naziv mjesnog odbora mora imati barem 2 znaka"),
    vrijemeOd: z.string(),
    vrijemeDo: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface LocationState {
    dateRange: {
        from: Date;
        to: Date;
    };
    houseId: number;
}

const NovaRezervacija: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { dateRange, houseId } = location.state as LocationState;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ime: "",
            prezime: "",
            adresa: "",
            grad: "",
            banka: "",
            iban: "",
            svrha: "zabava",
            mjesniOdbor: "",
            vrijemeOd: "08:00",
            vrijemeDo: "24:00",
        },
    });

    const onSubmit = (data: FormData) => {
        console.log("Rezervacija poslana", { ...data, dateRange, houseId });
        // Ovdje implementirajte logiku za slanje rezervacije na backend
        navigate("/potvrda-rezervacije");
    };

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Nova Rezervacija</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="ime">Ime</Label>
                                <Controller
                                    name="ime"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {errors.ime && <p className="text-red-500">{errors.ime.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="prezime">Prezime</Label>
                                <Controller
                                    name="prezime"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {errors.prezime && (
                                    <p className="text-red-500">{errors.prezime.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="adresa">Adresa</Label>
                            <Controller
                                name="adresa"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                            {errors.adresa && (
                                <p className="text-red-500">{errors.adresa.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="grad">Grad</Label>
                            <Controller
                                name="grad"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                            {errors.grad && <p className="text-red-500">{errors.grad.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="banka">Banka</Label>
                            <Controller
                                name="banka"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                            {errors.banka && <p className="text-red-500">{errors.banka.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="iban">IBAN</Label>
                            <Controller
                                name="iban"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                            {errors.iban && <p className="text-red-500">{errors.iban.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="svrha">Svrha namjene</Label>
                            <Controller
                                name="svrha"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Odaberite svrhu" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="zabava">Zabava</SelectItem>
                                            <SelectItem value="politicke_stranke">
                                                Političke stranke
                                            </SelectItem>
                                            <SelectItem value="savjetovanje_predavanje">
                                                Savjetovanje i predavanje
                                            </SelectItem>
                                            <SelectItem value="sportske_priredbe">
                                                Sportske priredbe, rekreacije
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.svrha && <p className="text-red-500">{errors.svrha.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="mjesniOdbor">Naziv mjesnog odbora</Label>
                            <Controller
                                name="mjesniOdbor"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                            {errors.mjesniOdbor && (
                                <p className="text-red-500">{errors.mjesniOdbor.message}</p>
                            )}
                        </div>
                        <div>
                            <Label>Datum rezervacije</Label>
                            <p>
                                {format(dateRange.from, "dd.MM.yyyy.")} -{" "}
                                {format(dateRange.to, "dd.MM.yyyy.")}
                            </p>
                        </div>
                        <Button type="submit">Potvrdi Rezervaciju</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NovaRezervacija;
