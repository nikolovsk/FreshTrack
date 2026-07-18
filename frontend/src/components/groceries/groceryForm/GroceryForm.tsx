import * as React from "react";
import type { GroceryFormData, GroceryFormErrors } from "../../../types/grocery.ts";
import type { Category } from "../../../types/category.ts";

type Props = {
    formData: GroceryFormData;
    setFormData: React.Dispatch<React.SetStateAction<GroceryFormData>>;
    categories: Category[];
    errors: GroceryFormErrors;
};

function GroceryForm({ formData, setFormData, categories, errors }: Props) {

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
                    className={errors.name ? "input-error" : ""}
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                        handleChange("name", e.target.value)
                    }
                    placeholder="Enter grocery name"
                />

                {errors.name && (
                    <span className="form-error">{errors.name}</span>
                )}
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Quantity</label>

                    <input
                        className={errors.quantity ? "input-error" : ""}
                        type="number"
                        required
                        min="1"
                        value={formData.quantity}
                        onChange={(e) =>
                            handleChange("quantity", Number(e.target.value))
                        }
                    />

                    {errors.quantity && (
                        <span className="form-error">{errors.quantity}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Price</label>

                    <input
                        className={errors.price ? "input-error" : ""}
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                            handleChange("price", e.target.value === "" ? "" : Number(e.target.value))
                        }
                    />

                    {errors.price && (
                        <span className="form-error">{errors.price}</span>
                    )}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Purchase Date</label>

                    <input
                        className={errors.purchaseDate ? "input-error" : ""}
                        type="date"
                        required
                        value={formData.purchaseDate}
                        onChange={(e) =>
                            handleChange("purchaseDate", e.target.value)
                        }
                    />

                    {errors.purchaseDate && (
                        <span className="form-error">{errors.purchaseDate}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Expiration Date</label>

                    <input
                        className={errors.expirationDate ? "input-error" : ""}
                        type="date"
                        required
                        value={formData.expirationDate}
                        onChange={(e) =>
                            handleChange("expirationDate", e.target.value)
                        }
                    />

                    {errors.expirationDate && (
                        <span className="form-error">{errors.expirationDate}</span>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label>Category</label>

                <select
                    className={errors.categoryId ? "input-error" : ""}
                    required
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

                {errors.categoryId && (
                    <span className="form-error">{errors.categoryId}</span>
                )}
            </div>
        </form>
    );
}

export default GroceryForm;