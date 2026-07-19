import InventoryHeader from "../components/groceries/InventoryHeader";
import UseSoonSection from "../components/groceries/UseSoonSection.tsx";
import InventoryStats from "../components/groceries/InventoryStats.tsx";
import { useGroceries } from "../hooks/useGroceries.ts";
import { useState } from "react";
import InventorySearch from "../components/groceries/InventorySearch.tsx";
import CategorySection from "../components/groceries/CategorySection.tsx";
import { useCategories } from "../hooks/useCategories.ts";
import GroceryFormModal from "../components/groceries/groceryForm/GroceryFormModal.tsx";
import InventoryActions from "../components/groceries/InventoryActions.tsx";
import type { Grocery, GroceryFormData } from "../types/grocery.ts";

export default function GroceriesPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
    const [selectedGrocery, setSelectedGrocery] = useState<Grocery | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { groceries, removeGrocery, updateGroceryOutcome, addGrocery, editGrocery } = useGroceries(search, selectedCategory);
    const categories = useCategories();

    const handleSaveGrocery = async (data: GroceryFormData) => {
        if (selectedGrocery) {
            await editGrocery(selectedGrocery.id, data);
        } else {
            await addGrocery(data);
        }
    };

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

            <InventoryActions
                totalItems={groceries.length}
                onAddGrocery={() => {
                    setSelectedGrocery(undefined);
                    setIsModalOpen(true);
                }}
            />

            <GroceryFormModal
                key={selectedGrocery?.id ?? "new"}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveGrocery}
                categories={categories}
                grocery={selectedGrocery}
            />

            <CategorySection
                groceries={groceries}
                search={search}
                selectedCategory={selectedCategory}
                onDelete={removeGrocery}
                onOutcomeChange={updateGroceryOutcome}
                onEdit={(grocery) => {
                    setSelectedGrocery(grocery);
                    setIsModalOpen(true);
                }}
            />
        </div>
    );
}