import InventoryHeader from "../components/groceries/InventoryHeader";
import UseSoonSection from "../components/groceries/UseSoonSection.tsx";
import InventoryStats from "../components/groceries/InventoryStats.tsx";
import { useGroceries } from "../hooks/useGroceries.ts";
import { useState } from "react";
import InventorySearch from "../components/groceries/InventorySearch.tsx";
import CategorySection from "../components/groceries/CategorySection.tsx";

export default function GroceriesPage() {
    const [search, setSearch] = useState("");

    const { groceries, removeGrocery, updateGroceryOutcome } = useGroceries(search);

    return (
        <div className="groceries-page">

            <InventoryHeader />

            <div className="inventory-overview">
                <InventoryStats groceries={groceries} />
                <UseSoonSection groceries={groceries} />
            </div>

            <InventorySearch value={search} onChange={setSearch} />

            <CategorySection
                groceries={groceries}
                search={search}
                onDelete={removeGrocery}
                onOutcomeChange={updateGroceryOutcome}
            />
        </div>
    );
}