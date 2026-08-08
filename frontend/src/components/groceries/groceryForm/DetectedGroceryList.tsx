import { CheckCircle2, Pencil, Trash2 } from "lucide-react";
import type { DetectedGrocery } from "../../../types/grocery.ts";

type Props = {
    groceries: DetectedGrocery[];
    onRemove: (index: number) => void;
    onEdit: (grocery: DetectedGrocery, index: number) => void;
};

function DetectedGroceryList({ groceries, onRemove, onEdit }: Props) {
    return (
        <div className="detected-groceries">

            <div className="detected-groceries-header">
                <div className="detected-groceries-title">
                    <div>
                        <h3>Detected Groceries</h3>
                        <p>Review these items before adding them to your inventory.</p>
                    </div>
                </div>

                <span className="detected-count">
                    {groceries.length} item{groceries.length !== 1 ? "s" : ""}
                </span>
            </div>

            {groceries.length > 0 ? (
                <div className="detected-grocery-list">
                    {groceries.map((grocery, index) => (
                        <div
                            key={`${grocery.name}-${index}`}
                            className="detected-grocery-item"
                        >
                            <div className="detected-grocery-icon">
                                <CheckCircle2 size={18} />
                            </div>

                            <div className="detected-grocery-main">
                                <span className="detected-grocery-name">
                                    {grocery.name}
                                </span>

                                <span className="detected-grocery-quantity">
                                    Quantity: {grocery.quantity}
                                </span>
                            </div>

                            <div className="detected-grocery-actions">
                                <button
                                    type="button"
                                    className="detected-action-btn edit"
                                    title="Edit grocery"
                                    onClick={() => onEdit(grocery, index)}
                                >
                                    <Pencil size={16} />
                                </button>

                                <button
                                    type="button"
                                    className="detected-action-btn delete"
                                    title="Remove grocery"
                                    onClick={() => onRemove(index)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="detected-empty-state">
                    <p>No groceries detected.</p>
                    <span>Try another photo with the groceries clearly visible.</span>
                </div>
            )}
        </div>
    );
}

export default DetectedGroceryList;