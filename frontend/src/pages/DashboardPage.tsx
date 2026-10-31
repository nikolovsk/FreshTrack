import { useEffect, useState } from "react";
import { AlertCircle, CalendarDays } from "lucide-react";
import { getDashboardSummary } from "../services/dashboardService.ts";
import { getDashboardDateRange } from "../utils/dashboardDateUtils.ts";
import { getHistoricalStats } from "../utils/dashboardStats.ts";
import DashboardSection from "../components/dashboards/DashboardSection.tsx";
import DashboardStatCard from "../components/dashboards/DashboardStatCard.tsx";
import type { DashboardCharts } from "../types/dashboardCharts.ts";
import { getDashboardCharts } from "../services/dashboardChartsService.ts";
import ConsumedVsWastedChart from "../components/dashboards/ConsumedVsWastedChart.tsx";
import SpendingOverTimeChart from "../components/dashboards/SpendingOverTimeChart.tsx";
import type { DashboardPeriod, DashboardSummary } from "../types/dashboard.ts";

const periodOptions: { label: string; value: DashboardPeriod }[] = [
    { label: "This Month", value: "THIS_MONTH" },
    { label: "Last Month", value: "LAST_MONTH" },
    { label: "Last 3 Months", value: "LAST_3_MONTHS" },
    { label: "All Time", value: "ALL_TIME" },
];

function DashboardPage() {
    const [period, setPeriod] = useState<DashboardPeriod>("THIS_MONTH");
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);

    const [charts, setCharts] = useState<DashboardCharts | null>(null);
    const [chartsLoading, setChartsLoading] = useState(true);
    const [chartsError, setChartsError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        const loadSummary = async () => {
            setLoading(true);
            setError(null);

            try {
                const { startDate, endDate } = getDashboardDateRange(period);
                const data = await getDashboardSummary(startDate, endDate);

                if (isActive) {
                    setSummary(data);
                }
            } catch {
                if (isActive) {
                    setError(
                        "We couldn't load your dashboard statistics. Please try again."
                    );
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        };

        void loadSummary();

        return () => {
            isActive = false;
        };
    }, [period, retryCount]);

    useEffect(() => {
        let isActive = true;

        const loadCharts = async () => {
            setChartsLoading(true);
            setChartsError(null);

            try {
                const { startDate, endDate } = getDashboardDateRange(period);
                const data = await getDashboardCharts(startDate, endDate);

                if (isActive) {
                    setCharts(data);
                }
            } catch {
                if (isActive) {
                    setChartsError(
                        "We couldn't load your charts. Please try again."
                    );
                }
            } finally {
                if (isActive) {
                    setChartsLoading(false);
                }
            }
        };

        void loadCharts();

        return () => {
            isActive = false;
        };
    }, [period]);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-MK", {
            style: "currency",
            currency: "MKD",
            maximumFractionDigits: 2,
        }).format(amount);

    const historicalStats = getHistoricalStats(summary, formatCurrency);

    return (
        <main className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <span className="dashboard-eyebrow">
                        <CalendarDays size={16} />
                        YOUR OVERVIEW
                    </span>
                    <h1>Dashboard</h1>
                    <p>Track your grocery spending, see what you've consumed and understand your food-waste habits.</p>
                </div>

                <label className="dashboard-period">
                    <span>Time period</span>
                    <select
                        value={period}
                        onChange={(event) =>
                            setPeriod(event.target.value as DashboardPeriod)
                        }
                    >
                        {periodOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </header>

            {error && (
                <div className="dashboard-error" role="alert">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                    <button type="button" onClick={() => setRetryCount((count) => count + 1)}>
                        Try again
                    </button>
                </div>
            )}

            <section className="dashboard-section">
                <DashboardSection
                    title="Your Statistics"
                    description="Summary for the selected period"
                />

                <div className="dashboard-stats-grid">
                    {historicalStats.map((stat) => (
                        <DashboardStatCard
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                            description={stat.description}
                            comparison={stat.comparison}
                            loading={loading}
                        />
                    ))}
                </div>
            </section>

            <section className="dashboard-section">
                <DashboardSection
                    title="Your Food Habits"
                    description="Explore your grocery spending and food-waste patterns"
                />

                {chartsError ? (
                    <div className="dashboard-error" role="alert">
                        <AlertCircle size={20} />
                        <span>{chartsError}</span>
                    </div>
                ) : (
                    <div className="dashboard-charts-grid">
                        <div className="dashboard-chart-card">
                            <h3>Consumed vs. Wasted</h3>
                            <p>Grocery entries recorded during this period</p>

                            <ConsumedVsWastedChart
                                itemsConsumed={charts?.itemsConsumed ?? 0}
                                itemsWasted={charts?.itemsWasted ?? 0}
                                loading={chartsLoading}
                            />
                        </div>

                        <div className="dashboard-chart-card">
                            <h3>Spending Over Time</h3>
                            <p>Monthly grocery spending</p>

                            <SpendingOverTimeChart
                                data={charts?.spendingOverTime ?? []}
                                loading={chartsLoading}
                            />
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}

export default DashboardPage;