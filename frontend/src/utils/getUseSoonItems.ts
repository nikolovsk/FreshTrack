import type { Grocery } from "../types/grocery.ts";
import { getDaysLeft } from "./dateUtils.ts";

export type UseSoonItem = Grocery & {
    daysLeft: number;
};

export function getUseSoonItems(groceries: Grocery[]): UseSoonItem[] {
    return groceries
        .filter((g) => g.status === "EXPIRING_SOON")
        .map((g) => ({
            ...g,
            daysLeft: getDaysLeft(g.expirationDate),
        }))
        .toSorted(
            (a, b) =>
                new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
        );
}