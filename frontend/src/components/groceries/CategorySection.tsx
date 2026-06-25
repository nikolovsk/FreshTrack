import type { Grocery } from "../../types/grocery";
import { groupGroceriesByCategory } from "../../utils/groupGroceriesByCategory";
import { formatDate } from "../../utils/dateUtils.ts";
import { formatStatus } from "../../utils/formatStatus.ts";
import { getCategoryTheme } from "../../utils/categoryTheme.ts";

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
                                <Icon size={18} color={theme.accent} />
                                <h3>{category}</h3>
                            </div>

                            <span>{items.length} item{items.length > 1 ? "s" : ""}</span>
                        </div>

                        <table className="category-table" >
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Expiration Date</th>
                            </tr>
                            </thead>

                            <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                            <span className={`status-badge ${item.status.toLowerCase()}`}>
                                                <span className="status-dot" />
                                                {formatStatus(item.status)}
                                            </span>
                                    </td>
                                    <td>{formatDate(item.expirationDate)}</td>
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