import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import AppProvider from "./routes/app-context";

const App = () => {
    return (
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    );
};

export default App;
