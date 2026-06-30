import { Search } from "lucide-react";
import type { Category } from "../../types/category.ts";

type Props = {
    value: string;
    onChange: (value: string) => void;
    categories: Category[];
    selectedCategory?: number;
    onCategoryChange: (value: number | undefined) => void;
};

function InventorySearch({ value, onChange, categories, selectedCategory, onCategoryChange }: Props) {
    return (
        <div className="inventory-search-section">
            <div className="inventory-search-header">
                <h3>Inventory Management</h3>
                <p>Search and manage your groceries efficiently</p>
            </div>

            <div className="inventory-toolbar">
                <div className="inventory-search">
                    <Search size={16} />

                    <input
                        type="text"
                        placeholder="Search by grocery name..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>

                <div className="inventory-filter">
                    <label className="filter-label">Category:</label>

                    <select
                        value={selectedCategory ?? ""}
                        onChange={(e) =>
                            onCategoryChange(
                                e.target.value
                                    ? Number(e.target.value)
                                    : undefined
                            )
                        }
                    >
                        <option value="">All Categories</option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default InventorySearch;