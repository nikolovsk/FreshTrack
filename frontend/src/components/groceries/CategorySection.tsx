import type { Grocery, GroceryOutcome } from "../../types/grocery";
import { groupGroceriesByCategory } from "../../utils/groupGroceriesByCategory";
import { formatDate } from "../../utils/dateUtils.ts";
import { formatStatus } from "../../utils/formatStatus.ts";
import { getCategoryTheme } from "../../utils/categoryTheme.ts";
import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal.tsx";
import OutcomeDropdown from "./OutcomeDropdown.tsx";
import EmptyState from "../EmptyState.tsx";
import { HighlightText } from "../HighlightText.tsx";

type Props = {
    groceries: Grocery[];
    search?: string;
    selectedCategory?: number;
    onDelete: (id: number) => void;
    onOutcomeChange: (id: number, outcome: GroceryOutcome) => void;
    onEdit: (grocery: Grocery) => void;
};

function CategorySection({ groceries, search, selectedCategory, onDelete, onOutcomeChange, onEdit }: Props) {
    const groupedGroceries = groupGroceriesByCategory(groceries);

    const hasActiveFilters = Boolean(search?.trim() || selectedCategory);
    const isEmptyResult = groceries.length === 0;
    const showEmptyInventory = isEmptyResult && !hasActiveFilters;
    const showNoResults = isEmptyResult && hasActiveFilters;

    const [selectedId, setSelectedId] = useState<number | null>(null);

    if (showEmptyInventory) {
        return (
            <EmptyState
                title="Your inventory is empty"
                description="Start by adding your first grocery item.
                Once you do, it will automatically appear grouped by category."
            />
        );
    }

    if (showNoResults) {
        return (
            <EmptyState
                title="No groceries match your search"
                description="Try a different keyword or clear your search to see all items."
            />
        );
    }

    return (
        <div className="category-sections">
            {Object.entries(groupedGroceries).map(([category, items]) => {
                const theme = getCategoryTheme(category);
                const Icon = theme.icon;

                return (
                    <div key={category} className="category-card">
                        <div className="category-header" style={{ background: theme.bg, borderBottom: `3px solid ${theme.accent}`, }}>
                            <div className="category-title">
                                <div className="category-icon">
                                    <Icon size={20} color={theme.accent} />
                                </div>

                                <h3>{category}</h3>
                            </div>

                            <span>{items.length} item{items.length > 1 ? "s" : ""}</span>
                        </div>

                        <table className="category-table" style={
                            {
                                "--table-row-bg": theme.tableBg,
                            } as React.CSSProperties
                        } >
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Purchase Date</th>
                                <th>Expiration Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>

                                <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <HighlightText text={item.name} query={search} />
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{formatDate(item.purchaseDate)}</td>
                                        <td>{formatDate(item.expirationDate)}</td>
                                        <td>
                                                <span className={`status-badge ${item.status.toLowerCase()}`}>
                                                    <span className="status-dot" />
                                                    {formatStatus(item.status)}
                                                </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">

                                                <button
                                                    className="action-btn edit"
                                                    title="Edit grocery"
                                                    onClick={() => onEdit(item)}
                                                >
                                                    <Pencil size={18} />
                                                </button>

                                                <OutcomeDropdown
                                                    groceryId={item.id}
                                                    onOutcomeChange={onOutcomeChange}
                                                />

                                                <button className="action-btn delete"
                                                        title="Delete grocery"
                                                        onClick={() => setSelectedId(item.id)} >
                                                    <Trash2 size={18} />
                                                </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}

            <ConfirmModal
                open={selectedId !== null}
                title="Delete Grocery"
                message="Are you sure you want to delete this item? This action cannot be undone."
                confirmText="Delete"
                onClose={() => setSelectedId(null)}
                onConfirm={() => {
                    if (selectedId !== null) {
                        onDelete(selectedId);
                        setSelectedId(null);
                    }
                }}
            />
        </div>
    );
}

export default CategorySection;