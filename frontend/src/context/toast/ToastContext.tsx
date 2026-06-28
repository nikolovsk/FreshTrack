import { createContext } from "react";
import type { Toast } from "../../types/toast";

export type ToastContextType = {
    showToast: (message: string, type?: Toast["type"]) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);