import { ArrowDown, ArrowUp, Minus, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DashboardComparison } from "../../types/dashboard.ts";

type Props = {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    description: string;
    comparison: DashboardComparison | null;
    loading: boolean;
};

export default function DashboardStatCard({
                                              label,
                                              value,
                                              icon: Icon,
                                              color,
                                              description,
                                              comparison,
                                              loading,
                                          }: Props) {
    const ComparisonIcon = comparison
        ? {
            up: ArrowUp,
            down: ArrowDown,
            same: Minus,
            new: Sparkles,
        } [comparison.direction] : null;

    return (
        <article className="dashboard-stat-card" aria-busy={loading}>
            <div className="dashboard-stat-top">
                <span className={`dashboard-stat-icon ${color}`}>
                    <Icon size={21} />
                </span>
            </div>

            <p className="dashboard-stat-label">{label}</p>

            <strong className="dashboard-stat-value">
                {loading ? "—" : value}
            </strong>

            {!loading && comparison && ComparisonIcon && (
                <div
                    className={`dashboard-stat-comparison ${comparison.sentiment}`}
                >
                    <ComparisonIcon size={14} />
                    <span>{comparison.text}</span>
                    <span className="comparison-caption">
                        vs. previous period
                    </span>
                </div>
            )}

            <span className="dashboard-stat-description">
                {description}
            </span>
        </article>
    );
}