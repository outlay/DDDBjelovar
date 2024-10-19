import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";

interface LoginDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginDialog = ({ isOpen, onClose }: LoginDialogProps) => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {isRegistering ? "Registracija" : "Prijava"}
                    </DialogTitle>
                </DialogHeader>
                {isRegistering ? (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                className="col-span-3"
                                placeholder="Unesite email"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Lozinka
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="col-span-3"
                                placeholder="Unesite lozinku"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="confirmPassword" className="text-right">
                                Potvrdite lozinku
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                className="col-span-3"
                                placeholder="Potvrdite lozinku"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms">Prihvaćam uvjete poslovanja</Label>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                className="col-span-3"
                                placeholder="Unesite email"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Lozinka
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="col-span-3"
                                placeholder="Unesite lozinku"
                            />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button type="submit" className="ml-2">
                        {isRegistering ? "Registriraj se" : "Prijavi se"}
                    </Button>
                </DialogFooter>
                <div className="mt-4 text-center">
                    <p>
                        {isRegistering ? (
                            <>
                                Već imate korisnički račun?{" "}
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() => setIsRegistering(false)}
                                >
                                    Prijavite se!
                                </span>
                            </>
                        ) : (
                            <>
                                Nemate korisnički račun?{" "}
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() => setIsRegistering(true)}
                                >
                                    Registriraj se!
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
