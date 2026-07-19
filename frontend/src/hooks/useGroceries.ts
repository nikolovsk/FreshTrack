import { useEffect, useState } from "react";
import { createGrocery, deleteGrocery, getGroceries, updateOutcome } from "../services/groceriesService";
import type { Grocery, GroceryFormData, GroceryOutcome } from "../types/grocery";
import { useToast } from "./useToast";

export function useGroceries(search: string, categoryId?: number) {
    const [groceries, setGroceries] = useState<Grocery[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        getGroceries(search, categoryId)
            .then((data) => setGroceries(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [search, categoryId]);

    const removeGrocery = async (id: number) => {
        await deleteGrocery(id);
        setGroceries((prevState) => prevState.filter((g) => g.id !== id));

        showToast("Grocery successfully deleted", "success");
    };

    const updateGroceryOutcome = async (
        id: number,
        outcome: GroceryOutcome
    ) => {
        await updateOutcome(id, outcome);
        setGroceries((prevState) => prevState.filter((g) => g.id !== id));

        const message = outcome === "CONSUMED" ?
            "Item marked as consumed" : "Item marked as wasted";

        showToast(message, "info");
    };

    const addGrocery = async (grocery: GroceryFormData) => {
        const created = await createGrocery(grocery);

        setGroceries(prev => [...prev, created]);

        showToast("Grocery added successfully", "success");
    };

    return { groceries, loading, removeGrocery, updateGroceryOutcome, addGrocery };
}