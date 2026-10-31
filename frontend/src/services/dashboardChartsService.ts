import api from "../api/axios.ts";
import type { DashboardCharts } from "../types/dashboardCharts.ts";

export const getDashboardCharts = async (startDate: string, endDate: string): Promise<DashboardCharts> => {
    const response = await api.get<DashboardCharts>(
        "/api/dashboard/charts",
        {
            params: { startDate, endDate },
        }
    );

    return response.data;
};