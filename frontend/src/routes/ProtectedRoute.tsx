import type { ReactNode } from "react";
import { getToken } from "../utils/token.ts";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default ProtectedRoute;