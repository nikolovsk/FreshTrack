import type { LucideIcon } from "lucide-react";

type Props = {
    label: string;
    value: number;
    icon: LucideIcon;
    color: string;
    loading: boolean;
};

export default function DashboardInventoryCard({ label, value, icon: Icon, color, loading }: Props) {
    return (
        <article
            className="dashboard-inventory-card"
            aria-busy={loading}
        >
            <span className={`dashboard-stat-icon ${color}`}>
                <Icon size={21} />
            </span>

            <div>
                <p>{label}</p>
                <strong>{loading ? "—" : value}</strong>
            </div>
        </article>
    );
}