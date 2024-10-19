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

const formSchema = z.object({
    email: z.string().email({ message: "Nevažeća email adresa" }),
    password: z.string().min(6, { message: "Lozinka mora imati najmanje 6 znakova" }),
});

interface LoginProps {
    onRegisterClick: () => void;
}

const Login = ({ onRegisterClick }: LoginProps) => {
    const { setJwtResponse } = useApp();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/login`,
                values
            );
            setJwtResponse(response.data);
            setError(null);
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
