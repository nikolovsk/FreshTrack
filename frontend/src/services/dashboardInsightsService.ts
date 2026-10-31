import api from "../api/axios.ts";
import type { DashboardInsights } from "../types/dashboardInsights.ts";

export async function getDashboardInsights( startDate: string, endDate: string ): Promise<DashboardInsights> {
    const response = await api.get<DashboardInsights>("/api/dashboard/insights", {
        params: {
            startDate,
            endDate,
        },
    });

    return response.data;
}