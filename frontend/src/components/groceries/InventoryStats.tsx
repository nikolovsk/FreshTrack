import { Package, Leaf, Clock3, AlertCircle } from "lucide-react";

export default function InventoryStats() {
    const stats = [
        {
            label: "Total Items",
            value: 42,
            description: "Currently in inventory",
            icon: Package,
            type: "total"
        },
        {
            label: "Fresh",
            value: 31,
            description: "Safe to use",
            icon: Leaf,
            type: "fresh"
        },
        {
            label: "Expiring Soon",
            value: 8,
            description: "Need attention",
            icon: Clock3,
            type: "soon"
        },
        {
            label: "Expired",
            value: 3,
            description: "Past expiration date",
            icon: AlertCircle,
            type: "expired"
        }
    ];

    return (
        <div className="inventory-stats">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div key={stat.label} className={`stat-card ${stat.type}`}>

                        <div className="stat-card-header">
                            <Icon size={20} />
                            <span>{stat.label}</span>
                        </div>

                        <div className="stat-value">
                            {stat.value}
                        </div>

                        <div className="stat-description">
                            {stat.description}
                        </div>

                    </div>
                );
            })}
        </div>
    );
}