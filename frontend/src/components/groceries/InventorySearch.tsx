import { Search } from "lucide-react";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

function InventorySearch({ value, onChange }: Props) {
    return (
        <div className="inventory-search-section">
            <div className="inventory-search-header">
                <h3>Inventory Management</h3>
                <p>Search and manage your groceries efficiently</p>
            </div>

            <div className="inventory-search">
                <Search size={16} />

                <input
                    type="text"
                    placeholder="Search by grocery name..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
}

export default InventorySearch;