import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { CategorySpending } from "../../types/dashboardCharts.ts";
import { getCategoryTheme } from "../../utils/categoryTheme.ts";

type SpendingByCategoryChartProps = {
    data: CategorySpending[];
    loading: boolean;
};

function SpendingByCategoryChart({
                                     data,
                                     loading,
                                 }: SpendingByCategoryChartProps) {
    const totalSpending = data.reduce(
        (total, item) => total + item.totalSpending,
        0
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
                Loading category spending...
            </div>
        );
    }

    if (data.length === 0 || totalSpending === 0) {
        return (
            <div className="dashboard-chart-empty">
                No category spending data available for this period yet.
            </div>
        );
    }

    const chartData = data.map((item) => {
        const theme = getCategoryTheme(item.categoryName);

        return {
            ...item,
            color: theme.chart,
        };
    });

    return (
        <div className="dashboard-chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="totalSpending"
                        nameKey="categoryName"
                        cx="50%"
                        cy="45%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={3}
                        stroke="none"
                    >
                        {chartData.map((entry) => (
                            <Cell
                                key={entry.categoryName}
                                fill={entry.color}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value) =>
                            formatCurrency(Number(value))
                        }
                        contentStyle={{
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                        }}
                    />

                    <Legend height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SpendingByCategoryChart;