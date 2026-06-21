import { AlertTriangle, ArrowRight } from "lucide-react";
import {Link} from "react-router-dom";

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
                    <AlertTriangle size={20} />
                    <h2>Use Soon</h2>
                </div>

                <div className="use-soon-title-row">
                    <span className="use-soon-count">
                        {items.length}
                    </span>
                    <p>
                        items need attention
                    </p>
                </div>
            </div>

            <div className="use-soon-list">
                {items.map((item) => (
                    <div key={item.id} className={`use-soon-item ${getUrgencyClass(item.daysLeft)}`} >
                        <div>
                            <h4>{item.name}</h4>

                            <div className="use-soon-category">
                                {item.category}
                            </div>
                        </div>

                        <div className="use-soon-days">
                            {item.daysLeft} day{item.daysLeft > 1 ? "s" : ""} left
                        </div>
                    </div>
                ))}
            </div>

            <Link to="/recipes" className="use-soon-btn">
                Find Recipes
                <ArrowRight size={16} />
            </Link>
        </div>
    );
}