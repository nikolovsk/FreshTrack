import type { Grocery } from "../types/grocery";

export function calculateGroceryStats(groceries: Grocery[]) {
    return groceries.reduce(
        (acc, g) => {
            acc.total++;

            if (g.status === "FRESH") acc.fresh++;
            else if (g.status === "EXPIRING_SOON") acc.soon++;
            else if (g.status === "EXPIRED") acc.expired++;

            return acc;
        },
        { total: 0, fresh: 0, soon: 0, expired: 0 }
    );
}