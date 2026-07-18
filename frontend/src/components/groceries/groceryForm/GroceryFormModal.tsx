import { X } from "lucide-react";
import type { Grocery, GroceryFormData } from "../../../types/grocery.ts";
import type { Category } from "../../../types/category.ts";
import { useState } from "react";
import GroceryForm from "./GroceryForm.tsx";

type Props = {
    open: boolean;
    onClose: () => void;
    categories: Category[];
    grocery?: Grocery;
};

const createInitialFormData = (grocery?: Grocery): GroceryFormData => {
    if (grocery) {
        return {
            name: grocery.name,
            quantity: grocery.quantity,
            price: grocery.price,
            purchaseDate: grocery.purchaseDate,
            expirationDate: grocery.expirationDate,
            categoryId: grocery.categoryId,
        };
    }

    return {
        name: "",
        quantity: 1,
        price: "",
        purchaseDate: "",
        expirationDate: "",
        categoryId: "",
    };
};

function GroceryFormModal({ open, onClose, categories, grocery }: Props) {
    const [formData, setFormData] = useState<GroceryFormData>(createInitialFormData(grocery));
    const [mode, setMode] = useState<"manual" | "ai">("manual");

    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="grocery-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="grocery-modal-header">
                    <h2>{grocery ? "Edit Grocery" : "Add Grocery"}</h2>

                    <button className="btn-close" onClick={onClose}>
                        <X size={22} />
                    </button>
                </div>

                <div className="grocery-modal-tabs">
                    <button
                        className={mode === "manual" ? "active" : ""}
                        onClick={() => setMode("manual")}
                    >
                        Manual
                    </button>

                    <button
                        className={mode === "ai" ? "active" : ""}
                        onClick={() => setMode("ai")}
                    >
                        AI Upload
                    </button>
                </div>

                <div className="grocery-modal-body">
                    {mode === "manual" ? (
                        <GroceryForm
                            formData={formData}
                            setFormData={setFormData}
                            categories={categories}
                        />
                    ) : (
                        <div className="ai-upload-placeholder">
                            AI Grocery Recognition coming soon...
                        </div>
                    )}
                </div>

                <div className="grocery-modal-footer">
                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="save-grocery-btn"
                        onClick={() => {
                            console.log(formData);
                        }}
                    >
                        Save Grocery
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GroceryFormModal;