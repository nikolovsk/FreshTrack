import { CheckCircle2, CircleDollarSign, Package, TrendingDown, Wallet } from "lucide-react";
import type { DashboardHistoricalStat, DashboardSummary } from "../types/dashboard.ts";

export const getHistoricalStats = (
    summary: DashboardSummary | null,
    formatCurrency: (amount: number) => string
): DashboardHistoricalStat[] => [
    {
        label: "Groceries Purchased",
        value: summary?.groceriesPurchased ?? 0,
        icon: Package,
        color: "green",
        description: "Grocery entries purchased",
    },
    {
        label: "Total Spending",
        value: formatCurrency(summary?.totalSpending ?? 0),
        icon: Wallet,
        color: "blue",
        description: "Money spent on groceries",
    },
    {
        label: "Money Lost to Waste",
        value: formatCurrency(summary?.totalWastedSpending ?? 0),
        icon: CircleDollarSign,
        color: "red",
        description: "Value of groceries marked as wasted",
    },
    {
        label: "Items Consumed",
        value: summary?.itemsConsumed ?? 0,
        icon: CheckCircle2,
        color: "purple",
        description: "Items marked as consumed",
    },
    {
        label: "Items Wasted",
        value: summary?.itemsWasted ?? 0,
        icon: TrendingDown,
        color: "orange",
        description: "Items marked as wasted",
    },
];

