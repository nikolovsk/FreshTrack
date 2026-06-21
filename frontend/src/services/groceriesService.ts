import api from "../api/axios.ts";
import type { Grocery } from "../types/grocery.ts";

export const getGroceries = async (): Promise<Grocery[]> => {
    const response = await api.get<Grocery[]>("/api/groceries");
    return response.data;
};