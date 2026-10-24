import { useEffect, useState } from "react";
import { AlertCircle, CalendarDays } from "lucide-react";
import { getDashboardSummary, type DashboardPeriod, type DashboardSummary } from "../services/dashboardService.ts";
import { getDashboardDateRange } from "../utils/dashboardDateUtils.ts";
import { getHistoricalStats, getInventoryStats } from "../utils/dashboardStats.ts";
import DashboardSection from "../components/dashboards/DashboardSection.tsx";
import DashboardStatCard from "../components/dashboards/DashboardStatCard.tsx";
import DashboardInventoryCard from "../components/dashboards/DashboardInventoryCard.tsx";

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

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-MK", {
            style: "currency",
            currency: "MKD",
            maximumFractionDigits: 2,
        }).format(amount);

    const historicalStats = getHistoricalStats(summary, formatCurrency);
    const inventoryStats = getInventoryStats(summary);

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
                            loading={loading}
                        />
                    ))}
                </div>
            </section>

            <section className="dashboard-section">
                <DashboardSection
                    title="Current Inventory"
                    description="See the current state of your active groceries"
                />

                <div className="dashboard-inventory-grid">
                    {inventoryStats.map((stat) => (
                        <DashboardInventoryCard
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                            loading={loading}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default DashboardPage;