import { Plus } from "lucide-react";

type Props = {
    totalItems: number;
    onAddGrocery: () => void;
};

function InventoryActions({ totalItems, onAddGrocery }: Props) {
    return (
        <div className="inventory-actions">
            <div className="inventory-total">
                <span className="inventory-total-label">Total Groceries:</span>
                <span className="inventory-total-value">{totalItems}</span>
            </div>

            <button className="add-grocery-btn" onClick={onAddGrocery}>
                <Plus size={18} />
                Add Grocery Item
            </button>
        </div>
    );
}

export default InventoryActions;