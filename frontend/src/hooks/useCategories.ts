import { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";
import type { Category } from "../types/category";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(console.error);
    }, []);

    return categories;
}