import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth.ts";
import api from "../api/axios.ts";

export const login = async (
    request: LoginRequest
): Promise<AuthResponse> => {

    const response = await api.post<AuthResponse>(
        "/auth/login",
        request
    );

    return response.data;
};

export const register = async (
    request: RegisterRequest
): Promise<AuthResponse> => {

    const response = await api.post<AuthResponse>(
        "/auth/register",
        request
    );

    return response.data;
};