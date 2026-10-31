export type MonthlySpending = {
    month: string;
    totalSpending: number;
    wastedSpending: number;
};

export type CategorySpending = {
    categoryName: string;
    totalSpending: number;
};

export type DashboardCharts = {
    spendingOverTime: MonthlySpending[];
    itemsConsumed: number;
    itemsWasted: number;
    spendingByCategory: CategorySpending[];
};