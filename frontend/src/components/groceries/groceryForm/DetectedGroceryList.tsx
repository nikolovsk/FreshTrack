import { CheckCircle2, Circle, Info, Pencil, Trash2 } from "lucide-react";
import type { DetectedGrocery } from "../../../types/grocery.ts";

type Props = {
    groceries: DetectedGrocery[];
    onRemove: (index: number) => void;
    onEdit: (grocery: DetectedGrocery, index: number) => void;
};

function DetectedGroceryList({ groceries, onRemove, onEdit }: Props) {

    const isGroceryComplete = (grocery: DetectedGrocery): boolean => {
        return (
            grocery.name.trim() !== "" &&
            grocery.quantity > 0 &&
            grocery.categoryId !== "" &&
            grocery.purchaseDate !== "" &&
            grocery.expirationDate !== ""
        );
    };

    return (
        <div className="detected-groceries">

            <div className="detected-groceries-header">
                <div className="detected-groceries-title">
                    <div>
                        <h3>Detected Groceries</h3>
                        <div className="detected-groceries-info">
                            <Info size={15} />
                            <p>Review and complete each item before adding it to your inventory.</p>
                        </div>
                    </div>
                </div>

                <span className="detected-count">
                    {groceries.length} item{groceries.length !== 1 ? "s" : ""}
                </span>
            </div>

            {groceries.length > 0 ? (
                <div className="detected-grocery-list">
                    {groceries.map((grocery, index) => {
                        const isComplete = isGroceryComplete(grocery);

                        return (
                            <div
                                key={`${grocery.name}-${index}`}
                                className={`detected-grocery-item ${isComplete ? "complete" : ""}`}
                            >
                                <div className={`detected-grocery-icon ${isComplete ? "complete" : ""}`}>
                                    {isComplete ? (<CheckCircle2 size={18} />) : (<Circle size={18} />)}
                                </div>

                                <div className="detected-grocery-main">
                                    <span className="detected-grocery-name">{grocery.name}</span>
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
                        );
                    })}
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