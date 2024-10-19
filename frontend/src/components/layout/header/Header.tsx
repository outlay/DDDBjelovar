import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import LoginDialog from "@/components/auth/login/Login"; // Pretpostavljamo da imate ovu komponentu

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white shadow">
            <Link to="/domovi">
                <span className="text-lg text-blue-800">Pregled domova</span>
            </Link>
            <div className="flex items-center">
                <Link to="/">
                    <img className="h-12 w-auto" src={Logo} alt="Logo" />
                </Link>
            </div>
            <nav className="flex space-x-4 items-center">
                <Button
                    onClick={openDialog}
                    variant="outline"
                    className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                >
                    Prijava
                </Button>
            </nav>
            <LoginDialog isOpen={isOpen} onClose={closeDialog} />
        </header>
    );
};

export default Header;
