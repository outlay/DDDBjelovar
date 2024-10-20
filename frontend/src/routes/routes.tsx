import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ErrorComponent from "../components/ErrorComponent";
import Home from "../views/Home";
import CommunityHouses from "../views/CommunityHouses";
import CommunityHouseDisplay from "../views/CommunityHouseDisplay";
import { useApp } from "./app-context";
import { UserRole } from "@/models/user";
import MyReservations from "@/views/applicant/MyReservations";
import ReservationDetails from "@/views/applicant/ReservationDetails";
import NovaRezervacija from "@/views/applicant/nova-rezervacija";
import Zapisnici from "@/views/janitor/Zapisnici";
import Potpisi from "@/views/mayor/Potpisi";

const ProtectedRoute = ({
    allowedRoles,
    children,
}: {
    allowedRoles: UserRole[];
    children: React.ReactNode;
}) => {
    const { jwtResponse } = useApp();

    if (!jwtResponse?.accessToken || !jwtResponse.user) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(jwtResponse.user.role as UserRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

const publicRoutes = (
    <Route
        path="/"
        element={<Layout />}
        errorElement={<ErrorComponent message="This content does not exist!" />}
    >
        <Route index element={<Home />} />
        <Route path="/domovi" element={<CommunityHouses />} />
        <Route path="/dom/:id" element={<CommunityHouseDisplay />} />
    </Route>
);

const userRoutes = (
    <Route
        element={
            <ProtectedRoute allowedRoles={[UserRole.ROLE_APPLICANT]}>
                <Layout></Layout>
            </ProtectedRoute>
        }
    >
        <Route path="/nova-rezervacija" element={<NovaRezervacija />} />
        <Route path="/rezervacije" element={<MyReservations />} />
        <Route path="/rezervacije/:id" element={<ReservationDetails />} />
    </Route>
);

const cityRoutes = (
    <Route
        element={
            <ProtectedRoute allowedRoles={[UserRole.ROLE_CITY_SERVICE]}>
                <Layout></Layout>
            </ProtectedRoute>
        }
    >
        <Route path="/zahtjevi" element={<MyReservations />} />
    </Route>
);

const janitorRoutes = (
    <Route
        element={
            <ProtectedRoute allowedRoles={[UserRole.ROLE_JANITOR, UserRole.ROLE_CITY_SERVICE]}>
                <Layout></Layout>
            </ProtectedRoute>
        }
    >
        <Route path="/zapisnici" element={<Zapisnici />} />
    </Route>
);

const mayorRoutes = (
    <Route
        element={
            <ProtectedRoute allowedRoles={[UserRole.ROLE_MAYOR]}>
                <Layout></Layout>
            </ProtectedRoute>
        }
    >
        <Route path="/potpisi" element={<Potpisi />} />
    </Route>
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {publicRoutes}
            {userRoutes}
            {cityRoutes}
            {janitorRoutes}
            {mayorRoutes}
            <Route path="/unauthorized" element={<ErrorComponent message="Unauthorized" />} />
            <Route path="/403" element={<ErrorComponent message="403 Error | Forbidden" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </>
    )
);

export default router;
