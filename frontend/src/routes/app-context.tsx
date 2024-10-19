import axios from "axios";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface JwtResponse {
    accessToken: string;
    accessTokenExpires: number;
    type: string;
    user: UserResponse;
}

interface AppContextType {
    jwtResponse: JwtResponse | null;
    setJwtResponse: (newJwtResponse: JwtResponse | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const jwtResponseFromStorage = localStorage.getItem("jwtResponse");
    const jwtResponseParsed = jwtResponseFromStorage ? JSON.parse(jwtResponseFromStorage) : null;

    const [jwtResponse, setJwtResponse_] = useState<JwtResponse | null>(jwtResponseParsed);

    const setJwtResponse = (newJwtResponse: JwtResponse | null) => {
        setJwtResponse_(newJwtResponse);
    };

    useEffect(() => {
        if (jwtResponse) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtResponse.accessToken}`;
            localStorage.setItem("jwtResponse", JSON.stringify(jwtResponse));
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("jwtResponse");
        }
    }, [jwtResponse]);

    const contextValue = useMemo(
        () => ({
            jwtResponse,
            setJwtResponse,
        }),
        [jwtResponse]
    );

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};

export default AppProvider;
