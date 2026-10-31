import { CheckCircle2, CircleDollarSign, Package, TrendingDown, Wallet } from "lucide-react";
import type { DashboardComparison, DashboardHistoricalStat, DashboardSummary } from "../types/dashboard.ts";

const getComparison = (current: number, previous: number): DashboardComparison => {
    if (previous === 0) {
        if (current === 0) {
            return {
                text: "No change",
                direction: "same",
            };
        }

        return {
            text: "New",
            direction: "new",
        };
    }

    const percentageChange = ((current - previous) / previous) * 100;

    if (percentageChange === 0) {
        return {
            text: "No change",
            direction: "same",
        };
    }

    const direction = percentageChange > 0 ? "up" : "down";

    return {
        text: `${Math.abs(percentageChange).toFixed(1)}%`,
        direction,
    };
};

export const getHistoricalStats = (
    summary: DashboardSummary | null,
    formatCurrency: (amount: number) => string
): DashboardHistoricalStat[] => {
    const stats = [
        {
            label: "Groceries Purchased",
            current: summary?.groceriesPurchased ?? 0,
            previous: summary?.previousGroceriesPurchased ?? 0,
            icon: Package,
            color: "green",
            description: "Grocery entries purchased",
        },
        {
            label: "Total Spending",
            current: summary?.totalSpending ?? 0,
            previous: summary?.previousTotalSpending ?? 0,
            icon: Wallet,
            color: "blue",
            description: "Money spent on groceries",
        },
        {
            label: "Money Lost to Waste",
            current: summary?.totalWastedSpending ?? 0,
            previous: summary?.previousTotalWastedSpending ?? 0,
            icon: CircleDollarSign,
            color: "red",
            description: "Value of groceries marked as wasted",
        },
        {
            label: "Items Consumed",
            current: summary?.itemsConsumed ?? 0,
            previous: summary?.previousItemsConsumed ?? 0,
            icon: CheckCircle2,
            color: "purple",
            description: "Items marked as consumed",
        },
        {
            label: "Items Wasted",
            current: summary?.itemsWasted ?? 0,
            previous: summary?.previousItemsWasted ?? 0,
            icon: TrendingDown,
            color: "orange",
            description: "Items marked as wasted",
        },
    ];

    return stats.map((stat) => ({
        label: stat.label,
        value:
            stat.label === "Total Spending" ||
            stat.label === "Money Lost to Waste"
                ? formatCurrency(stat.current)
                : stat.current,
        icon: stat.icon,
        color: stat.color,
        description: stat.description,
        comparison: getComparison(stat.current, stat.previous),
    }));
};