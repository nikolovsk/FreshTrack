import { useEffect, useState } from "react";
import { getGroceries } from "../services/groceriesService";
import type { Grocery } from "../types/grocery";

export function useGroceries() {
    const [groceries, setGroceries] = useState<Grocery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGroceries()
            .then((data) => setGroceries(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { groceries, loading };
}