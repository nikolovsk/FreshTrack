import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";

type ConsumedVsWastedChartProps = {
    itemsConsumed: number;
    itemsWasted: number;
    loading: boolean;
};

const chartColors = {
    consumed: "#16a34a",
    wasted: "#f97316",
};

function ConsumedVsWastedChart({ itemsConsumed, itemsWasted, loading }: ConsumedVsWastedChartProps) {
    const chartData = [
        { name: "Consumed", value: itemsConsumed, color: chartColors.consumed },
        { name: "Wasted", value: itemsWasted, color: chartColors.wasted },
    ];

    const total = itemsConsumed + itemsWasted;

    if (loading) {
        return (
            <div className="dashboard-chart-loading">
                Loading consumption data...
            </div>
        );
    }

    if (total === 0) {
        return (
            <div className="dashboard-chart-empty">
                No consumed or wasted items recorded for this period yet.
            </div>
        );
    }

    return (
        <div className="dashboard-chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={3}
                        stroke="none"
                    >
                        {chartData.map((entry) => (
                            <Cell
                                key={entry.name}
                                fill={entry.color}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value) => [
                            Number(value),
                            "Grocery entries",
                        ]}
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

export default ConsumedVsWastedChart;