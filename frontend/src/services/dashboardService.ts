import api from "../api/axios.ts";

export type DashboardSummary = {
    groceriesPurchased: number;
    totalSpending: number;
    itemsConsumed: number;
    itemsWasted: number;
    freshItems: number;
    expiringSoonItems: number;
    expiredItems: number;
};

export type DashboardPeriod = "THIS_MONTH" | "LAST_MONTH" | "LAST_3_MONTHS" | "ALL_TIME";

export const getDashboardSummary = async (startDate: string, endDate: string): Promise<DashboardSummary> => {
    const response = await api.get<DashboardSummary>("/api/dashboard/summary", {
        params: {
            startDate,
            endDate,
        },
    });

    return response.data;
};