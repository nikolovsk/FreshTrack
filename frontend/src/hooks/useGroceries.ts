import { useEffect, useState } from "react";
import { deleteGrocery, getGroceries, updateOutcome } from "../services/groceriesService";
import type { Grocery, GroceryOutcome } from "../types/grocery";
import { useToast } from "./useToast";

export function useGroceries(search: string) {
    const [groceries, setGroceries] = useState<Grocery[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        getGroceries(search)
            .then((data) => setGroceries(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [search]);

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

    return { groceries, loading, removeGrocery, updateGroceryOutcome };
}