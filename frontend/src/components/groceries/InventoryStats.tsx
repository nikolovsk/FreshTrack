import { Package, Leaf, Clock3, AlertCircle } from "lucide-react";
import { useGroceries } from "../../hooks/useGroceries.ts";
import { calculateGroceryStats } from "../../utils/groceryStats.ts";

export default function InventoryStats() {
    const { groceries } = useGroceries();

    const statsData = calculateGroceryStats(groceries);

    const stats = [
        {
            label: "Total Items",
            value: statsData.total,
            description: "Currently in inventory",
            icon: Package,
            type: "total"
        },
        {
            label: "Fresh",
            value: statsData.fresh,
            description: "Safe to use",
            icon: Leaf,
            type: "fresh"
        },
        {
            label: "Expiring Soon",
            value: statsData.soon,
            description: "Need attention",
            icon: Clock3,
            type: "soon"
        },
        {
            label: "Expired",
            value: statsData.expired,
            description: "Past expiration date",
            icon: AlertCircle,
            type: "expired"
        }
    ];


    return (
        <div>

            <div className="stats-header">
                <h2>Inventory Overview</h2>
                <p>Real-time breakdown of your groceries</p>
            </div>

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
        </div>
    );
}