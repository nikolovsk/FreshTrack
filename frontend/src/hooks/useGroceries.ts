import { useEffect, useState } from "react";
import { deleteGrocery, getGroceries, updateOutcome } from "../services/groceriesService";
import type { Grocery, GroceryOutcome } from "../types/grocery";

export function useGroceries() {
    const [groceries, setGroceries] = useState<Grocery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGroceries()
            .then((data) => setGroceries(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const removeGrocery = async (id: number) => {
        await deleteGrocery(id);
        setGroceries((prevState) => prevState.filter((g) => g.id !== id));
    };

    const updateGroceryOutcome = async (
        id: number,
        outcome: GroceryOutcome
    ) => {
        await updateOutcome(id, outcome);
        setGroceries((prevState) =>
            prevState.filter((g) => g.id !== id)
        );
    };

    return { groceries, loading, removeGrocery, updateGroceryOutcome };
}