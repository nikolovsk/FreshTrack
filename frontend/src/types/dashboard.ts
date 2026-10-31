import type { LucideIcon } from "lucide-react";

export type DashboardComparison = {
    text: string;
    direction: "up" | "down" | "same" | "new";
    sentiment: "positive" | "negative" | "neutral";
};

export type DashboardHistoricalStat = {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    description: string;
    comparison: DashboardComparison | null;
};

export type DashboardSummary = {
    groceriesPurchased: number;
    totalSpending: number;
    itemsConsumed: number;
    itemsWasted: number;
    totalWastedSpending: number;

    freshItems: number;
    expiringSoonItems: number;
    expiredItems: number;

    previousGroceriesPurchased: number;
    previousTotalSpending: number;
    previousItemsConsumed: number;
    previousItemsWasted: number;
    previousTotalWastedSpending: number;
};

export type DashboardPeriod = "THIS_MONTH" | "LAST_MONTH" | "LAST_3_MONTHS" | "ALL_TIME";

export type CategorySpending = {
    categoryName: string;
    totalSpending: number;
};