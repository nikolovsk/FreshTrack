import { AlertCircle, CheckCircle2, Clock3, Leaf, Package, TrendingDown, Wallet } from "lucide-react";

import type { DashboardSummary } from "../services/dashboardService.ts";
import type { DashboardHistoricalStat, DashboardInventoryStat } from "../types/dashboard.ts";

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

export const getInventoryStats = (
    summary: DashboardSummary | null
): DashboardInventoryStat[] => [
    {
        label: "Fresh",
        value: summary?.freshItems ?? 0,
        icon: Leaf,
        color: "green",
    },
    {
        label: "Expiring Soon",
        value: summary?.expiringSoonItems ?? 0,
        icon: Clock3,
        color: "orange",
    },
    {
        label: "Expired",
        value: summary?.expiredItems ?? 0,
        icon: AlertCircle,
        color: "red",
    },
];