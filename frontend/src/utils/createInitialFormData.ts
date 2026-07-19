import type { Grocery, GroceryFormData } from "../types/grocery.ts";

export const createInitialFormData = (grocery?: Grocery): GroceryFormData => {
    if (grocery) {
        return {
            name: grocery.name,
            quantity: grocery.quantity,
            price: grocery.price,
            purchaseDate: grocery.purchaseDate,
            expirationDate: grocery.expirationDate,
            categoryId: grocery.categoryId,
        };
    }

    return {
        name: "",
        quantity: 1,
        price: "",
        purchaseDate: "",
        expirationDate: "",
        categoryId: "",
    };
};