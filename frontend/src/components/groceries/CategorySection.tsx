import type { Grocery } from "../../types/grocery";
import { groupGroceriesByCategory } from "../../utils/groupGroceriesByCategory";
import { formatDate } from "../../utils/dateUtils.ts";
import { formatStatus } from "../../utils/formatStatus.ts";
import { getCategoryTheme } from "../../utils/categoryTheme.ts";
import * as React from "react";
import { Pencil, CheckCircle2, Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal.tsx";

type Props = {
    groceries: Grocery[];
    onDelete: (id: number) => void;
};

function CategorySection({ groceries, onDelete }: Props) {
    const groupedGroceries = groupGroceriesByCategory(groceries);

    const [selectedId, setSelectedId] = useState<number | null>(null);

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
                                    <td>{item.name}</td>
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

                                            <button className="action-btn edit" title="Edit grocery">
                                                <Pencil size={18} />
                                            </button>

                                            <button className="action-btn complete" title="Mark as completed">
                                                <CheckCircle2 size={18} />
                                            </button>

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