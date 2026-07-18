import type { GroceryFormData, GroceryFormErrors } from "../types/grocery";

export function validateGroceryForm(formData: GroceryFormData): GroceryFormErrors {
    const errors: GroceryFormErrors = {};

    if (!formData.name.trim()) {
        errors.name = "Grocery name is required";
    }

    if (!formData.quantity) {
        errors.quantity = "Quantity is required";
    }

    if (formData.quantity <= 0) {
        errors.quantity = "Quantity must be greater than 0";
    }

    if (!formData.price) {
        errors.price = "Price is required";
    }

    if (formData.price !== "" && formData.price < 0) {
        errors.price = "Price cannot be negative";
    }

    if (!formData.purchaseDate) {
        errors.purchaseDate = "Purchase date is required";
    }

    if (!formData.expirationDate) {
        errors.expirationDate = "Expiration date is required";
    }

    if (formData.purchaseDate && formData.expirationDate && formData.expirationDate < formData.purchaseDate) {
        errors.expirationDate = "Expiration date must be after purchase date";
    }

    if (!formData.categoryId) {
        errors.categoryId = "Category is required";
    }

    return errors;
}