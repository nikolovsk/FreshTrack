import api from "../api/axios.ts";
import type { DashboardSummary } from "../types/dashboard.ts";

export const getDashboardSummary = async (startDate: string, endDate: string): Promise<DashboardSummary> => {
    const response = await api.get<DashboardSummary>("/api/dashboard/summary", {
        params: {
            startDate,
            endDate,
        },
    });

    return response.data;
};