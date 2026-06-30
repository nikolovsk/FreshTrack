import api from "../api/axios.ts";
import type { Grocery } from "../types/grocery.ts";

export const getGroceries = async (
    search?: string,
    categoryId?: number
): Promise<Grocery[]> => {
    const response = await api.get<Grocery[]>("/api/groceries", {
        params: {
            search: search || undefined,
            categoryId: categoryId || undefined,
        },
    });

    return response.data;
};

export const deleteGrocery = async (id: number): Promise<void> => {
    await api.delete(`/api/groceries/${id}`);
};

export const updateOutcome = async (
    id: number,
    outcome: "ACTIVE" | "CONSUMED" | "WASTED"
) => {
    await api.patch(`/api/groceries/${id}/outcome?outcome=${outcome}`);
}