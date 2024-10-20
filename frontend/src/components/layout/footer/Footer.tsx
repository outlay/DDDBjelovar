import { Link } from "react-router-dom";
import { Instagram, Facebook, Globe, Mail, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-6 relative z-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Društveni domovi Bjelovar</h3>
                        <p className="text-sm">© 2024 Sva prava pridržana</p>
                    </div>
                    <div className="w-full md:w-1/3 flex justify-center gap-6 mb-4 md:mb-0">
                        <Link
                            to="mailto:info@bjelovar.hr"
                            className="text-white hover:text-gray-300 flex gap-2 items-center mr-4"
                        >
                            <Mail className="h-6 w-6" />
                            tajnistvo@gradbjelovar.hr
                        </Link>
                        <Link
                            to="tel:+38543622100"
                            className="text-white hover:text-gray-300 flex gap-2 items-center"
                        >
                            <Phone className="h-6 w-6" />
                            +385 99 4140 110
                        </Link>
                    </div>
                    <div className="w-full md:w-1/3">
                        <div className="flex justify-end space-x-4">
                            <a
                                href="https://www.instagram.com/grad_bjelovar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
                            >
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a
                                href="https://www.facebook.com/grad.bjelovar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
                            >
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a
                                href="https://www.bjelovar.hr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
                            >
                                <Globe className="h-6 w-6" />
                            </a>
                            <a
                                href="https://www.tpbj.hr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
                            >
                                <Globe className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
