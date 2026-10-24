import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById, getRecommendedRecipes } from "../services/recipesService.ts";
import type { Recipe } from "../types/recipe.ts";
import RecipeDetailHero from "../components/recipes/details/RecipeDetailHero.tsx";
import RecipeIngredients from "../components/recipes/details/RecipeIngredients.tsx";
import RecipeInstructions from "../components/recipes/details/RecipeInstructions.tsx";
import RecipeBackButton from "../components/recipes/details/RecipeBackButton.tsx";
import RecipeDetailsMessage from "../components/recipes/details/RecipeDetailsMessage.tsx";

function RecipeDetailsPage() {

    const { id } = useParams<{ id: string }>();

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loadedRecipeId, setLoadedRecipeId] = useState<string | null>(null);
    const loading = !id || loadedRecipeId !== id;
    const [error, setError] = useState<string | null>(null);
    const [expiringIngredients, setExpiringIngredients] = useState<string[]>([]);
    const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);

    useEffect(() => {
        if (!id) {
            return;
        }

        let cancelled = false;

        Promise.all([
            getRecipeById(id),
            getRecommendedRecipes(),
        ])
            .then(([recipeData, recommendations]) => {
                if (cancelled) return;

                const recommendation = recommendations.find((item) => item.id === id);
                const expiring = recommendation?.matchedIngredients ?? [];
                const normalizedExpiring = new Set(expiring.map((ingredient) => ingredient.trim().toLowerCase()));

                const preselected = recipeData.ingredients
                    .map((ingredient, index) => ({ingredient: ingredient.trim().toLowerCase(), index}))
                    .filter((item) => normalizedExpiring.has(item.ingredient))
                    .map((item) => item.index);

                setRecipe(recipeData);
                setExpiringIngredients(expiring);
                setCheckedIngredients(preselected);
                setError(null);
            })
            .catch(() => {
                if (cancelled) return;
                setError("Failed to load recipe details. Please try again.");
            })
            .finally(() => {
                if (!cancelled) {
                    setLoadedRecipeId(id);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    const toggleIngredient = (index: number) => {
        setCheckedIngredients((previous) =>
            previous.includes(index) ? previous.filter((item) => item !== index) : [...previous, index]);
    };

    if (!id) {
        return (
            <div className="recipe-details-page">
                <RecipeDetailsMessage message="Recipe ID is missing." variant="error" />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="recipe-details-page">
                <RecipeDetailsMessage message="Loading recipe details..." />
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="recipe-details-page">
                <RecipeBackButton />
                <RecipeDetailsMessage message={error || "Recipe not found."} variant="error" />
            </div>
        );
    }

    const instructions = (recipe.instructions || "")
        .split(/\r?\n/)
        .map((step) => step.trim())
        .filter(Boolean);

    return (
        <div className="recipe-details-page">
            <RecipeDetailHero
                recipe={recipe}
                description={"Discover delicious ways to use your ingredients and keep good food from going to waste."}
            />

            <div className="recipe-detail-layout">
                <RecipeIngredients
                    ingredients={recipe.ingredients}
                    measurements={recipe.measurements}
                    expiringIngredients={expiringIngredients}
                    checkedIngredients={checkedIngredients}
                    onToggleIngredient={toggleIngredient}
                />

                <RecipeInstructions instructions={instructions} />
            </div>

            <div className="recipe-details-back">
                <RecipeBackButton />
            </div>

        </div>
    );
}

export default RecipeDetailsPage;