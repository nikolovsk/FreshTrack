import { useState } from "react";
import * as React from "react";

import { AuthContext } from "./AuthContext";
import { getToken, setToken as saveToken, removeToken } from "../utils/token";
import { isTokenExpired } from "../utils/jwt";

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [token, setTokenState] = useState<string | null>(() => {
        const storedToken = getToken();

        if (storedToken && !isTokenExpired(storedToken)) {
            return storedToken;
        }

        removeToken();
        return null;
    });

    const isAuthenticated = !!token && !isTokenExpired(token);

    const loginUser = (token: string) => {
        saveToken(token);
        setTokenState(token);
    };

    const logoutUser = () => {
        removeToken();
        setTokenState(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}