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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z
    .object({
        email: z.string().email({ message: "Nevažeća email adresa" }),
        password: z.string().min(6, { message: "Lozinka mora imati najmanje 6 znakova" }),
        confirmPassword: z.string(),
        terms: z
            .boolean()
            .refine(val => val === true, { message: "Morate prihvatiti uvjete poslovanja" }),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Lozinke se ne podudaraju",
        path: ["confirmPassword"],
    });

interface RegisterProps {
    onLoginClick: () => void;
}

const Register = ({ onLoginClick }: RegisterProps) => {
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/`, {
                email: values.email,
                password: values.password,
            });
            setError(null);
            onLoginClick();
        } catch {
            setError("Neuspješna registracija. Pokušajte ponovno.");
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Potvrdite lozinku</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Potvrdite lozinku" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Prihvaćam uvjete poslovanja</FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit">Registriraj se</Button>
            </form>
            <div className="mt-4 text-center">
                <p>
                    Već imate korisnički račun?{" "}
                    <span className="text-blue-500 cursor-pointer" onClick={onLoginClick}>
                        Prijavite se!
                    </span>
                </p>
            </div>
        </Form>
    );
};

export default Register;
