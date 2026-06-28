export type GroceryStatus = "FRESH" | "EXPIRING_SOON" | "EXPIRED";

export type GroceryOutcome = "ACTIVE" | "CONSUMED" | "WASTED";

export type Grocery = {
    id: number;
    name: string;
    quantity: number;
    price: number;
    purchaseDate: string;
    expirationDate: string;
    status: GroceryStatus;
    categoryId: number;
    categoryName: string;
};