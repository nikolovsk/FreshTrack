import GroceriesAnimation from "../GroceriesAnimation.tsx";
import groceriesAnimation from "../../assets/groceriesBasket.json";
import { Info } from "lucide-react";

export default function InventoryHeader() {
    return (
        <div className="inventory-header">
            <div className="inventory-header-content">

                <div className="inventory-header-text">
                    <span className="inventory-header-tag">
                        Inventory Management
                    </span>

                    <h1>My Inventory</h1>

                    <p>Track your groceries, reduce waste, and make the most of what you already have.</p>

                    <span className="inventory-header-hint">
                        <Info size={16} />
                        Expiring items will appear first in your "Use Soon" section
                    </span>
                </div>

                <div className="inventory-header-animation">
                    <GroceriesAnimation animationData={groceriesAnimation} speed={0.7} />
                </div>

            </div>
        </div>
    );
}