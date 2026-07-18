import InventoryHeader from "../components/groceries/InventoryHeader";
import UseSoonSection from "../components/groceries/UseSoonSection.tsx";
import InventoryStats from "../components/groceries/InventoryStats.tsx";
import { useGroceries } from "../hooks/useGroceries.ts";
import { useState } from "react";
import InventorySearch from "../components/groceries/InventorySearch.tsx";
import CategorySection from "../components/groceries/CategorySection.tsx";
import { useCategories } from "../hooks/useCategories.ts";
import GroceryFormModal from "../components/groceries/GroceryFormModal.tsx";
import InventoryActions from "../components/groceries/InventoryActions.tsx";

export default function GroceriesPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { groceries, removeGrocery, updateGroceryOutcome } = useGroceries(search, selectedCategory);
    const categories = useCategories();

    return (
        <div className="groceries-page">

            <InventoryHeader />

            <div className="inventory-overview">
                <InventoryStats groceries={groceries} />
                <UseSoonSection groceries={groceries} />
            </div>

            <InventorySearch
                value={search}
                onChange={setSearch}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            <GroceryFormModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <InventoryActions
                totalItems={groceries.length}
                onAddGrocery={() => setIsModalOpen(true)}
            />

            <CategorySection
                groceries={groceries}
                search={search}
                selectedCategory={selectedCategory}
                onDelete={removeGrocery}
                onOutcomeChange={updateGroceryOutcome}
            />
        </div>
    );
}