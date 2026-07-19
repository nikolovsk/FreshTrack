import api from "../api/axios.ts";
import type { Grocery, GroceryFormData } from "../types/grocery.ts";

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

export const createGrocery = async (
    grocery: GroceryFormData
): Promise<Grocery> => {
    const response = await api.post<Grocery>("/api/groceries", grocery);

    return response.data;
};

export const updateGrocery = async (
    id: number,
    grocery: GroceryFormData
): Promise<Grocery> => {
    const response = await api.put<Grocery>(`/api/groceries/${id}`, grocery);

    return response.data;
};