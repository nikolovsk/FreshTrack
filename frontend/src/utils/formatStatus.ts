import type { GroceryStatus } from "../types/grocery";

export function formatStatus(status: GroceryStatus) {
    switch (status) {
        case "FRESH":
            return "Fresh";

        case "EXPIRING_SOON":
            return "Expiring Soon";

        case "EXPIRED":
            return "Expired";
    }
}