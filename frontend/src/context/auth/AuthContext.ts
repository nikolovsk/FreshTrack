import { createContext } from "react";

export interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    loginUser: (token: string) => void;
    logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);