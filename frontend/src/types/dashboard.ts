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