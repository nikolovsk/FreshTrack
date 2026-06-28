import { useEffect, useRef, useState } from "react";
import { Check, X, CheckCircle2 } from "lucide-react";
import type { GroceryOutcome } from "../../types/grocery";

type Props = {
    groceryId: number;
    onOutcomeChange: (id: number, outcome: GroceryOutcome) => void;
};

function OutcomeDropdown({ groceryId, onOutcomeChange }: Props) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="mark-dropdown" ref={dropdownRef}>
            <button
                className="action-btn complete"
                title="Mark outcome"
                onClick={() => setOpen((prev) => !prev)}
            >
                <CheckCircle2 size={18} />
            </button>

            {open && (
                <div className="mark-menu">
                    <button
                        className="menu-item consumed"
                        onClick={() => {
                            onOutcomeChange(groceryId, "CONSUMED");
                            setOpen(false);
                        }}
                    >
                        <Check size={16} />
                        <span>Mark as consumed</span>
                    </button>

                    <button
                        className="menu-item wasted"
                        onClick={() => {
                            onOutcomeChange(groceryId, "WASTED");
                            setOpen(false);
                        }}
                    >
                        <X size={16} />
                        <span>Mark as wasted</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default OutcomeDropdown;