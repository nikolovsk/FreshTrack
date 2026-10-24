import type { LucideIcon } from "lucide-react";

type Props = {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    description: string;
    loading: boolean;
};

export default function DashboardStatCard({ label, value, icon: Icon, color, description, loading }: Props) {
    return (
        <article
            className="dashboard-stat-card"
            aria-busy={loading}
        >
            <div className="dashboard-stat-top">
                <span className={`dashboard-stat-icon ${color}`}>
                    <Icon size={21} />
                </span>
            </div>

            <p className="dashboard-stat-label">{label}</p>

            <strong className="dashboard-stat-value">{loading ? "—" : value}</strong>

            <span className="dashboard-stat-description">{description}</span>
        </article>
    );
}