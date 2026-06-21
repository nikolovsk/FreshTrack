import { AlertTriangle } from "lucide-react";

export default function UseSoonSection() {
    const items = [
        {
            id: 1,
            name: "Milk",
            category: "Dairy",
            daysLeft: 1,
        },
        {
            id: 2,
            name: "Spinach",
            category: "Vegetables",
            daysLeft: 2,
        },
        {
            id: 3,
            name: "Eggs",
            category: "Dairy",
            daysLeft: 3,
        },
    ];

    function getUrgencyClass(daysLeft: number) {
        if (daysLeft <= 1) return "critical";
        if (daysLeft <= 3) return "warning";
        return "normal";
    }

    return (
        <div className="use-soon">
            <div className="use-soon-header">
                <div className="use-soon-title">
                    <AlertTriangle size={18} />
                    <h2>Use Soon</h2>
                </div>

                <p>
                    {items.length} ingredients need attention
                </p>
            </div>

            <div className="use-soon-list">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`use-soon-item ${getUrgencyClass(item.daysLeft)}`}
                    >
                        <div>
                            <h4>{item.name}</h4>
                            <span>{item.category}</span>
                        </div>

                        <div className="use-soon-days">
                            {item.daysLeft} day{item.daysLeft > 1 ? "s" : ""} left
                        </div>
                    </div>
                ))}
            </div>

            <button className="use-soon-btn">
                Find Recipes
            </button>
        </div>
    );
}