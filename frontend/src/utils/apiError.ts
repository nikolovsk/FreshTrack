import type { AxiosError } from "axios";
import type { ApiError } from "../types/auth.ts";

export const getErrorMessage = (err: unknown): string => {
    const error = err as AxiosError<ApiError>;

    return (
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
    );
};