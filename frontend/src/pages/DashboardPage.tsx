import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CalendarDays, CheckCircle2, Clock3, Leaf, Package, TrendingDown, Wallet } from "lucide-react";
import { getDashboardSummary, type DashboardPeriod, type DashboardSummary } from "../services/dashboardService.ts";
import { getDashboardDateRange } from "../utils/dashboardDateUtils.ts";

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

    const fetchSummary = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { startDate, endDate } = getDashboardDateRange(period);
            const data = await getDashboardSummary(startDate, endDate);
            setSummary(data);
        } catch {
            setError("We couldn't load your dashboard statistics. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [period]);

    useEffect(() => {
        void fetchSummary();
    }, [fetchSummary]);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-MK", {
            style: "currency",
            currency: "MKD",
            maximumFractionDigits: 2,
        }).format(amount);

    const historicalStats = [
        {
            label: "Groceries Purchased",
            value: summary?.groceriesPurchased ?? 0,
            icon: Package,
            color: "green",
            description: "Grocery entries purchased",
        },
        {
            label: "Total Spending",
            value: formatCurrency(summary?.totalSpending ?? 0),
            icon: Wallet,
            color: "blue",
            description: "Money spent on groceries",
        },
        {
            label: "Items Consumed",
            value: summary?.itemsConsumed ?? 0,
            icon: CheckCircle2,
            color: "purple",
            description: "Items marked as consumed",
        },
        {
            label: "Items Wasted",
            value: summary?.itemsWasted ?? 0,
            icon: TrendingDown,
            color: "orange",
            description: "Items marked as wasted",
        },
    ];

    const inventoryStats = [
        {
            label: "Fresh",
            value: summary?.freshItems ?? 0,
            icon: Leaf,
            color: "green",
        },
        {
            label: "Expiring Soon",
            value: summary?.expiringSoonItems ?? 0,
            icon: Clock3,
            color: "orange",
        },
        {
            label: "Expired",
            value: summary?.expiredItems ?? 0,
            icon: AlertCircle,
            color: "red",
        },
    ];

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
                    <button type="button" onClick={() => void fetchSummary()}>
                        Try again
                    </button>
                </div>
            )}

            <section className="dashboard-section">
                <div className="dashboard-section-heading">
                    <div>
                        <h2>Your Statistics</h2>
                        <p>Summary for the selected period</p>
                    </div>
                </div>

                <div className="dashboard-stats-grid">
                    {historicalStats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <article
                                className="dashboard-stat-card"
                                key={stat.label}
                                aria-busy={loading}
                            >
                                <div className="dashboard-stat-top">
                                    <span className={`dashboard-stat-icon ${stat.color}`}>
                                        <Icon size={21} />
                                    </span>
                                </div>

                                <p className="dashboard-stat-label">{stat.label}</p>

                                <strong className="dashboard-stat-value">
                                    {loading ? "—" : stat.value}
                                </strong>

                                <span className="dashboard-stat-description">
                                    {stat.description}
                                </span>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="dashboard-section">
                <div className="dashboard-section-heading">
                    <div>
                        <h2>Current Inventory</h2>
                        <p>See the current state of your active groceries</p>
                    </div>
                </div>

                <div className="dashboard-inventory-grid">
                    {inventoryStats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <article
                                className="dashboard-inventory-card"
                                key={stat.label}
                                aria-busy={loading}
                            >
                                <span className={`dashboard-stat-icon ${stat.color}`}>
                                    <Icon size={21} />
                                </span>

                                <div>
                                    <p>{stat.label}</p>
                                    <strong>{loading ? "—" : stat.value}</strong>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

export default DashboardPage;