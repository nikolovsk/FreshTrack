import { X } from "lucide-react";

type Props = {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onClose: () => void;
};

export default function ConfirmModal({
                                         open,
                                         title,
                                         message,
                                         confirmText = "Yes, I'm sure",
                                         cancelText = "Cancel",
                                         onConfirm,
                                         onClose,
                                     }: Props) {
    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button onClick={onClose} className="modal-close">
                        <X size={20} />
                    </button>
                </div>

                <p className="modal-message">{message}</p>

                <div className="modal-actions">
                    <button className="btn-modal secondary" onClick={onClose}>
                        {cancelText}
                    </button>

                    <button className="btn-modal danger" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}