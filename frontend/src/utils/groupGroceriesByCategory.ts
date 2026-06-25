import type { Grocery } from "../types/grocery";

export function groupGroceriesByCategory(groceries: Grocery[]): Record<string, Grocery[]> {
    return groceries.reduce((groups, grocery) => {
        const category = grocery.categoryName;

        if (!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(grocery);

        return groups;
    }, {} as Record<string, Grocery[]>);
}