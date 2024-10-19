import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ErrorComponent from "./components/ErrorComponent";
import Home from "./views/Home";
import CommunityHouses from "./views/CommunityHouses";
import CommunityHouseDisplay from "./views/CommunityHouseDisplay";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Layout />}
            errorElement={<ErrorComponent message="This content does not exist!" />}
        >
            <Route index element={<Home />} />
            <Route path="/domovi" element={<CommunityHouses />} />
            <Route path="/dom/:id" element={<CommunityHouseDisplay />} />
        </Route>
    )
);

export default router;
