import InventoryHeader from "../components/groceries/InventoryHeader";
import UseSoonSection from "../components/groceries/UseSoonSection.tsx";
import InventoryStats from "../components/groceries/InventoryStats.tsx";

export default function GroceriesPage() {
    return (
        <div className="groceries-page">

            <InventoryHeader />

            <div className="inventory-overview">
                <InventoryStats />
                <UseSoonSection />
            </div>

        </div>
    );
}