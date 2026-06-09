import axios from "axios";
import { getToken, removeToken } from "../utils/token.ts";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

const PUBLIC_ROUTES = [
    "/auth/login",
    "/auth/register"
];

api.interceptors.request.use(
    (config) => {
        const token = getToken();

        const isPublicRoute = PUBLIC_ROUTES.some(route =>
            (config.url ?? "").startsWith(route)
        );

        if (token && !isPublicRoute) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            removeToken();

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
)

export default api;