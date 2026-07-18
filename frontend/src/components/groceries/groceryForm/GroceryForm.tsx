import * as React from "react";
import type { GroceryFormData } from "../../../types/grocery.ts";
import type { Category } from "../../../types/category.ts";

type Props = {
    formData: GroceryFormData;
    setFormData: React.Dispatch<React.SetStateAction<GroceryFormData>>;
    categories: Category[];
};

function GroceryForm({ formData, setFormData, categories }: Props) {

    const handleChange = (field: keyof GroceryFormData, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <form className="grocery-form">
            <div className="form-group">
                <label>Grocery Name</label>

                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                        handleChange("name", e.target.value)
                    }
                    placeholder="Enter grocery name"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Quantity</label>

                    <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) =>
                            handleChange("quantity", Number(e.target.value))
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                            handleChange("price", e.target.value === "" ? "" : Number(e.target.value))
                        }
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Purchase Date</label>

                    <input
                        type="date"
                        value={formData.purchaseDate}
                        onChange={(e) =>
                            handleChange("purchaseDate", e.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Expiration Date</label>

                    <input
                        type="date"
                        value={formData.expirationDate}
                        onChange={(e) =>
                            handleChange("expirationDate", e.target.value)
                        }
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Category</label>

                <select
                    value={formData.categoryId}
                    onChange={(e) =>
                        handleChange("categoryId", e.target.value === "" ? "" : Number(e.target.value))
                    }
                >
                    <option value="">Select category</option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    );
}

export default GroceryForm;