import type { Grocery } from "../../types/grocery";
import { groupGroceriesByCategory } from "../../utils/groupGroceriesByCategory";
import { formatDate } from "../../utils/dateUtils.ts";
import { formatStatus } from "../../utils/formatStatus.ts";
import { getCategoryTheme } from "../../utils/categoryTheme.ts";
import * as React from "react";

type Props = {
    groceries: Grocery[];
};

function CategorySection({ groceries }: Props) {
    const groupedGroceries = groupGroceriesByCategory(groceries);

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
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}

export default CategorySection;