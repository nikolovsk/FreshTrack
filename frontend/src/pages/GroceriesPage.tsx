import InventoryHeader from "../components/groceries/InventoryHeader";
import UseSoonSection from "../components/groceries/UseSoonSection.tsx";
import InventoryStats from "../components/groceries/InventoryStats.tsx";
import { useGroceries } from "../hooks/useGroceries.ts";

export default function GroceriesPage() {
    const { groceries } = useGroceries()

    return (
        <div className="groceries-page">

            <InventoryHeader />

            <div className="inventory-overview">
                <InventoryStats groceries={groceries} />
                <UseSoonSection groceries={groceries} />
            </div>

        </div>
    );
}