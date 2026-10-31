import type { LucideIcon } from "lucide-react";

export type DashboardHistoricalStat = {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    description: string;
};

export type DashboardInventoryStat = {
    label: string;
    value: number;
    icon: LucideIcon;
    color: string;
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
};

export type DashboardPeriod = "THIS_MONTH" | "LAST_MONTH" | "LAST_3_MONTHS" | "ALL_TIME";