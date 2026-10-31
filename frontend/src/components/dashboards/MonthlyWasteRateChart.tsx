import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { MonthlyWasteRate } from "../../types/dashboardCharts.ts";

type MonthlyWasteRateChartProps = {
    data: MonthlyWasteRate[];
    loading: boolean;
};

function MonthlyWasteRateChart({ data, loading }: MonthlyWasteRateChartProps) {
    const chartData = data.map((item) => {
        const [year, month] = item.month.split("-");
        const date = new Date(Number(year), Number(month) - 1);

        return {
            ...item,
            monthLabel: date.toLocaleDateString("en-US", {
                month: "short",
                year: "2-digit",
            }),
        };
    });

    const formatPercentage = (value: number) => `${value}%`;

    if (loading) {
        return (
            <div className="dashboard-chart-loading">
                Loading waste rate data...
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="dashboard-chart-empty">
                No waste rate data available for this period yet.
            </div>
        );
    }

    return (
        <div className="dashboard-chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={chartData}
                    margin={{ top: 15, right: 20, left: 0, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e5e7eb"
                    />

                    <XAxis
                        dataKey="monthLabel"
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        domain={[0, 100]}
                        tickFormatter={formatPercentage}
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        width={50}
                    />

                    <Tooltip
                        formatter={(value, name) => {
                            if (name === "Waste Rate") {
                                return [`${Number(value).toFixed(1)}%`, name];
                            }

                            return [value, name];
                        }}
                        labelFormatter={(label) => `Month: ${label}`}
                        contentStyle={{
                            borderRadius: "10px",
                            border: "1px solid #e5e7eb",
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="wasteRate"
                        name="Waste Rate"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{
                            r: 5,
                            fill: "#16a34a",
                            stroke: "#ffffff",
                            strokeWidth: 2,
                        }}
                        activeDot={{
                            r: 7,
                            fill: "#15803d",
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MonthlyWasteRateChart;