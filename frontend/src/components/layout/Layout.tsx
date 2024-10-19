import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Toaster } from "../ui/toaster";

const Layout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Toaster></Toaster>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
