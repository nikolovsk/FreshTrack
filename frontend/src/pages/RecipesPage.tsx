import { useEffect, useState } from "react";
import { getRecommendedRecipes } from "../services/recipesService.ts";
import type { RecipeRecommendation } from "../types/recipe.ts";
import RecipesHeader from "../components/recipes/RecipesHeader.tsx";
import RecipeGrid from "../components/recipes/RecipeGrid.tsx";
import RecipeControls from "../components/recipes/RecipesSearch.tsx";
import Pagination from "../components/layout/pagination/Pagination.tsx";
import EmptyState from "../components/EmptyState.tsx";

function RecipesPage() {

    const [recipes, setRecipes] = useState<RecipeRecommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 12;

    useEffect(() => {
        getRecommendedRecipes()
            .then(setRecipes)
            .catch(() => {
                setError("Failed to load recipe recommendations.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredRecipes = recipes.filter((recipe) => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return true;
        }

        const matchesName = recipe.name.toLowerCase().includes(query);
        const matchesIngredient = recipe.matchedIngredients.some((ingredient) => ingredient.toLowerCase().includes(query));

        return matchesName || matchesIngredient;
    });

    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    const startIndex = (currentPage - 1) * recipesPerPage;

    const currentRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

    const handleRecipeClick = (id: string) => {
        console.log("Recipe clicked:", id);
    };

    return (
        <div className="recipes-page">

            <RecipesHeader />

            <div className="recipes-content">

                {loading && (
                    <div className="recipes-message">
                        Finding the best recipes for your groceries...
                    </div>
                )}

                {!loading && error && (
                    <div className="recipes-message recipes-error">
                        {error}
                    </div>
                )}

                {!loading && !error && recipes.length === 0 && (
                    <EmptyState
                        title="No recipe recommendations yet"
                        description="Add groceries that are expiring soon and we'll find recipes to help you use them."
                    />
                )}

                {!loading && !error && recipes.length > 0 && (
                    <section className="recommended-recipes">

                        <div className="recommended-recipes-header">
                            <div>
                                <h2>Recommended for You</h2>
                                <p>Recipes selected based on your groceries that are expiring soon.</p>
                            </div>

                            <span className="recommended-recipes-count">
                                {recipes.length} recipe
                                {recipes.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <RecipeControls
                            search={search}
                            onSearchChange={(value) => {
                                setSearch(value);
                                setCurrentPage(1);
                            }}
                        />

                        {filteredRecipes.length > 0 ? (
                            <>
                                <RecipeGrid
                                    recipes={currentRecipes}
                                    onRecipeClick={handleRecipeClick}
                                />

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        ) : (
                            <EmptyState
                                title="No recipes match your search"
                                description="Try a different keyword or clear your search to see all recommended recipes."
                            />
                        )}

                    </section>
                )}

            </div>

        </div>
    );
}

export default RecipesPage;