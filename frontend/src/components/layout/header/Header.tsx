import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import AuthDialog from "@/components/auth/AuthDialog";
import { useApp } from "@/routes/app-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserResponse } from "@/models/user";

const getInitials = (user: UserResponse | undefined) => {
    if (user) {
        const { firstName, lastName } = user;
        const firstNameInitial = firstName.charAt(0).toUpperCase();
        const lastNameInitial = lastName.charAt(0).toUpperCase();
        return `${firstNameInitial}${lastNameInitial}`;
    }
    return "";
};

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { jwtResponse, setJwtResponse } = useApp();

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        setJwtResponse(null);
    };

    const initials = getInitials(jwtResponse?.user);

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white shadow">
            <Link to="/domovi">
                <span className="text-lg text-blue-800">Pregled domova</span>
            </Link>
            <div className="flex items-center">
                <Link to="/">
                    <img className="h-12 w-auto" src={Logo} alt="Logo" />
                </Link>
            </div>
            <nav className="flex space-x-4 items-center">
                {jwtResponse?.accessToken ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="" alt="User avatar" />

                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-36 mr-8">
                            <DropdownMenuLabel>
                                <span>
                                    {jwtResponse.user.firstName} {jwtResponse.user.lastName}
                                </span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        onClick={openDialog}
                        variant="outline"
                        className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                        Prijava
                    </Button>
                )}
            </nav>
            <AuthDialog isOpen={isOpen} onClose={closeDialog} />
        </header>
    );
};

export default Header;
