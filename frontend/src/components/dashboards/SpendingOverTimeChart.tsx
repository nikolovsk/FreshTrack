import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonthlySpending } from "../../types/dashboardCharts.ts";

type SpendingOverTimeChartProps = {
    data: MonthlySpending[];
    loading: boolean;
};

function SpendingOverTimeChart({ data, loading }: SpendingOverTimeChartProps) {
    const chartData = useMemo(
        () =>
            data.map((item) => {
                const [year, month] = item.month.split("-").map(Number);

                return {
                    ...item,
                    monthLabel: new Intl.DateTimeFormat("en", {
                        month: "short",
                        year: "numeric",
                    }).format(new Date(year, month - 1, 1)),
                };
            }),
        [data]
    );

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-MK", {
            style: "currency",
            currency: "MKD",
            maximumFractionDigits: 2,
        }).format(amount);

    if (loading) {
        return (
            <div className="dashboard-chart-loading">
                Loading spending data...
            </div>
        );
    }

    if (chartData.length === 0) {
        return (
            <div className="dashboard-chart-empty">
                No spending data available for this period yet.
            </div>
        );
    }

    return (
        <div className="dashboard-chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 12, left: 12, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e5e7eb"
                    />

                    <XAxis
                        dataKey="monthLabel"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                    />

                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        tickFormatter={(value: number) =>
                            new Intl.NumberFormat("en-MK", {
                                notation: "compact",
                                maximumFractionDigits: 1,
                            }).format(value)
                        }
                    />

                    <Tooltip
                        formatter={(value) => [
                            formatCurrency(Number(value)),
                            "Spending",
                        ]}
                        contentStyle={{
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                        }}
                    />

                    <Bar
                        dataKey="totalSpending"
                        name="Spending"
                        fill="#16a34a"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={48}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SpendingOverTimeChart;