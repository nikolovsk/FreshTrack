import {
    Milk,
    Apple,
    Carrot,
    Beef,
    Snowflake,
    Croissant,
    Coffee,
    Wheat,
    Soup,
    Popcorn,
    Lollipop,
} from "lucide-react";

export function getCategoryTheme(category: string) {
    const key = category.toLowerCase();

    switch (key) {
        case "dairy":
            return {
                icon: Milk,
                accent: "#3b82f6",
                bg: "#dbeafe",
                tableBg: "#eff6ff",
            };

        case "fruits":
            return {
                icon: Apple,
                accent: "#22c55e",
                bg: "#dcfce7",
                tableBg: "#ecfdf5",
            };

        case "vegetables":
            return {
                icon: Carrot,
                accent: "#16a34a",
                bg: "#dcfce7",
                tableBg: "#f0fdf4",
            };

        case "meat & seafood":
            return {
                icon: Beef,
                accent: "#ef4444",
                bg: "#fee2e2",
                tableBg: "#fef2f2"
            };

        case "frozen food":
            return {
                icon: Snowflake,
                accent: "#0ea5e9",
                bg: "#e0f2fe",
                tableBg: "#f0f9ff"
            };

        case "bakery":
            return {
                icon: Croissant,
                accent: "#f59e0b",
                bg: "#fef3c7",
                tableBg: "#fffbeb"
            };

        case "beverages & coffee":
            return {
                icon: Coffee,
                accent: "#8b5cf6",
                bg: "#ede9fe",
                tableBg: "#f5f3ff"
            };

        case "grains & pasta":
            return {
                icon: Wheat,
                accent: "#eab308",
                bg: "#fef9c3",
                tableBg: "#fefce8"
            };

        case "snacks":
            return {
                icon: Popcorn,
                accent: "#f97316",
                bg: "#ffedd5",
                tableBg: "#fff7ed"
            };

        case "sweets":
            return {
                icon: Lollipop,
                accent: "#db2777",
                bg: "#fce7f3",
                tableBg: "#fdf2f8"
            };

        default:
            return {
                icon: Soup,
                accent: "#6366f1",
                bg: "#eef2ff",
                tableBg: "#f8fafc"
            };
    }
}