import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow">
            <Link to="/domovi">
                <span className="text-lg text-blue-800">Pregled domova</span>
            </Link>
            <div className="flex items-center">
                <Link to="/">
                    <img className="h-12 w-auto" src={Logo}></img>
                </Link>
            </div>
            <nav className="flex space-x-4 items-center">
                <Link to="/prijava">
                    <Button
                        variant="outline"
                        className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                        Prijava
                    </Button>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
