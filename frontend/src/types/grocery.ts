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
    outcome: GroceryOutcome;
    categoryId: number;
    categoryName: string;
};

export type GroceryFormData = {
    name: string;
    quantity: number;
    price: number | "";
    purchaseDate: string;
    expirationDate: string;
    categoryId: number | "";
}

export type GroceryFormErrors = {
    name?: string;
    quantity?: string;
    price?: string;
    purchaseDate?: string;
    expirationDate?: string;
    categoryId?: string;
};