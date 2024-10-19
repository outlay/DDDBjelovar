import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Login from "./login/Login";
import Register from "./register/Register";

interface LoginDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthDialog = ({ isOpen, onClose }: LoginDialogProps) => {
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsRegistering(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        onClose();
        setIsRegistering(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {isRegistering ? "Registracija" : "Prijava"}
                    </DialogTitle>
                </DialogHeader>
                {isRegistering ? (
                    <Register onLoginClick={() => setIsRegistering(false)} />
                ) : (
                    <Login
                        handleClose={handleClose}
                        onRegisterClick={() => setIsRegistering(true)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
