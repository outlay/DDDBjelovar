import {
    Navigate,
    Outlet,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/layout/Layout";
import ErrorComponent from "../components/ErrorComponent";
import Home from "../views/Home";
import CommunityHouses from "../views/CommunityHouses";
import CommunityHouseDisplay from "../views/CommunityHouseDisplay";
import { useApp } from "./app-context";

export enum UserRole {
    ROLE_APPLICANT = "ROLE_APPLICANT",
    ROLE_CITY_SERVICE = "ROLE_CITY_SERVICE",
    ROLE_JANITOR = "ROLE_JANITOR",
    ROLE_MAYOR = "ROLE_MAYOR",
}

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: UserRole[] }) => {
    const { jwtResponse } = useApp();

    if (!jwtResponse?.accessToken || !jwtResponse.user) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(jwtResponse.user.role as UserRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
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
            <ProtectedRoute
                allowedRoles={[
                    UserRole.ROLE_APPLICANT,
                    UserRole.ROLE_CITY_SERVICE,
                    UserRole.ROLE_JANITOR,
                ]}
            />
        }
    ></Route>
);

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {publicRoutes}
            {userRoutes}
            <Route path="/unauthorized" element={<ErrorComponent message="Unauthorized" />} />
            <Route path="/403" element={<ErrorComponent message="403 Error | Forbidden" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </>
    )
);

export default router;
