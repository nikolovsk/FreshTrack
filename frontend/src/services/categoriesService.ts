import api from "../api/axios.ts";
import type { Category } from "../types/category.ts";

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get("api/categories");

    return response.data;
}