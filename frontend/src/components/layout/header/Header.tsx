import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
import { UserResponse, UserRole } from "@/models/user";
import { format } from "date-fns";
import { BellIcon } from "lucide-react";

interface Notification {
    id: number;
    message: string;
    type: "info" | "warning" | "success";
    createdAt: Date;
    read: boolean;
}

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
    const role = jwtResponse?.user.role;
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            message: "Vaša rezervacija je potvrđena",
            type: "success",
            createdAt: new Date(),
            read: false,
        },
        {
            id: 2,
            message: "Društveni dom dostupan za najam",
            type: "info",
            createdAt: new Date(Date.now() - 86400000),
            read: false,
        },
        {
            id: 3,
            message: "Podsjetnik: Nadolazeća rezervacija",
            type: "warning",
            createdAt: new Date(Date.now() - 172800000),
            read: true,
        },
    ]);

    const unreadNotifications = notifications.filter(n => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => (n.id === id ? { ...n, read: true } : n)));
    };

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white shadow">
            <div className="flex items-center justify-center gap-4">
                <Link to="/" className="">
                    <span className="text-2xl font-bold text-blue-600 tracking-wider">DDB</span>
                </Link>

                <Link to="/domovi">
                    <span className="text-lg text-blue-800">Pregled domova</span>
                </Link>
                {role === UserRole.ROLE_APPLICANT && (
                    <Link to="/rezervacije">
                        <span className="text-lg text-blue-800">Moje rezervacije</span>
                    </Link>
                )}
                {role === UserRole.ROLE_JANITOR && (
                    <Link to="/zapisnici">
                        <span className="text-lg text-blue-800">Zapisnici</span>
                    </Link>
                )}
                {role === UserRole.ROLE_MAYOR && (
                    <Link to="/potpisi">
                        <span className="text-lg text-blue-800">Potpisi</span>
                    </Link>
                )}
            </div>

            <nav className="flex space-x-4 items-center gap-4">
                {jwtResponse?.accessToken ? (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="relative">
                                    <BellIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                                    {unreadNotifications > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                            {unreadNotifications}
                                        </span>
                                    )}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80 mr-8">
                                <DropdownMenuLabel>Notifikacije</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {notifications.length === 0 ? (
                                    <DropdownMenuItem>Nema notifikacija</DropdownMenuItem>
                                ) : (
                                    notifications.map(notification => (
                                        <DropdownMenuItem
                                            key={notification.id}
                                            className="flex flex-col items-start p-3 hover:bg-gray-100 transition-colors duration-200"
                                            onSelect={() => markAsRead(notification.id)}
                                        >
                                            <div className="flex items-center w-full">
                                                <div
                                                    className={`w-2 h-2 rounded-full mr-2 ${
                                                        notification.type === "info"
                                                            ? "bg-blue-500"
                                                            : notification.type === "warning"
                                                            ? "bg-yellow-500"
                                                            : "bg-green-500"
                                                    }`}
                                                />
                                                <span
                                                    className={`flex-grow ${
                                                        notification.read
                                                            ? "text-gray-500"
                                                            : "font-semibold"
                                                    }`}
                                                >
                                                    {notification.message}
                                                </span>
                                                {!notification.read && (
                                                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-500 mt-1">
                                                {format(
                                                    notification.createdAt,
                                                    "MMM d, yyyy HH:mm"
                                                )}
                                            </span>
                                        </DropdownMenuItem>
                                    ))
                                )}
                                {notifications.length > 0 && (
                                    <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                        Pogledaj sve
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                    </>
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
