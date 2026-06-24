import { AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Grocery } from "../../types/grocery.ts";
import { getUseSoonItems } from "../../utils/getUseSoonItems.ts";
import { getUrgencyClass } from "../../utils/groceryUrgency.ts";

type Props = {
    groceries: Grocery[];
};

function UseSoonSection({ groceries }: Props) {
    const items = getUseSoonItems(groceries);
    const isEmpty = items.length === 0;

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
                {isEmpty ? (
                    <div className="use-soon-empty">
                        <p>You're all caught up</p>
                        <span>Your groceries are fresh and under control.</span>
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className={`use-soon-item ${getUrgencyClass(item.daysLeft)}`} >
                            <div>
                                <h4>{item.name}</h4>

                                <div className="use-soon-category">
                                    {item.categoryName}
                                </div>
                            </div>

                            <div className="use-soon-days">
                                {item.daysLeft} day{item.daysLeft > 1 ? "s" : ""} left
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Link
                to="/recipes"
                  className={`use-soon-btn ${isEmpty ? "disabled" : ""}`}
                  onClick={(e) => {
                      if (isEmpty) e.preventDefault();
                  }}
            >
                Find Recipes
                <ArrowRight size={16} />
            </Link>
        </div>
    );
}

export default UseSoonSection;