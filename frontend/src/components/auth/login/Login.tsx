import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useApp } from "@/routes/app-context";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    email: z.string().email({ message: "Nevažeća email adresa" }),
    password: z.string().min(4, { message: "Lozinka mora imati najmanje 4 znakova" }),
});

interface LoginProps {
    onRegisterClick: () => void;
    handleClose: () => void;
}

const Login = ({ onRegisterClick, handleClose }: LoginProps) => {
    const { setJwtResponse } = useApp();
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response1 = await axios.get(`${import.meta.env.VITE_API_URL}/community-houses`);
            console.log(response1);
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/login`,
                values
            );
            setJwtResponse(response.data);
            setError(null);
            if (response.status === 200) {
                toast({ duration: 1000, title: "Uspješna prijava", description: "Dobrodošli!" });
                handleClose();
            }
        } catch {
            setError("Neuspješna prijava. Provjerite svoje podatke.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Unesite email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lozinka</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Unesite lozinku" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit">Prijavi se</Button>
            </form>
            <div className="mt-4 text-center">
                <p>
                    Nemate korisnički račun?{" "}
                    <span className="text-blue-500 cursor-pointer" onClick={onRegisterClick}>
                        Registriraj se!
                    </span>
                </p>
            </div>
        </Form>
    );
};

export default Login;
