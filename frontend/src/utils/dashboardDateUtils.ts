import type { DashboardPeriod } from "../services/dashboardService.ts";

export const getDashboardDateRange = (period: DashboardPeriod): { startDate: string; endDate: string } => {
    const today = new Date();

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    let startDate: Date;
    let endDate: Date;

    switch (period) {
        case "THIS_MONTH":
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = today;
            break;

        case "LAST_MONTH":
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0);
            break;

        case "LAST_3_MONTHS":
            startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
            endDate = today;
            break;

        case "ALL_TIME":
            startDate = new Date(2000, 0, 1);
            endDate = today;
            break;
    }

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
    };
};
