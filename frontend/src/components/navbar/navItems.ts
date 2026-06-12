import { Home, ShoppingBasket, UtensilsCrossed, BarChart3 } from "lucide-react";

export const navItems = [
    {
        path: "/",
        label: "Home",
        icon: Home,
        end: true
    },
    {
        path: "/groceries",
        label: "Groceries",
        icon: ShoppingBasket
    },
    {
        path: "/recipes",
        label: "Recipes",
        icon: UtensilsCrossed
    },
    {
        path: "/dashboard",
        label: "Dashboard",
        icon: BarChart3
    }
];