import { X } from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
};

function GroceryFormModal({ open, onClose }: Props) {
    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="grocery-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="grocery-modal-header">
                    <h2>Add Grocery</h2>

                    <button className="btn-close" onClick={onClose}>
                        <X size={22} />
                    </button>
                </div>

                <div className="grocery-modal-body">

                    {/* Form will go here */}

                </div>
            </div>
        </div>
    );
}

export default GroceryFormModal;