import { useEffect, useState } from "react";
import { ArrowLeft, Check, ChefHat, Utensils } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById, getRecommendedRecipes } from "../services/recipesService.ts";
import type { Recipe } from "../types/recipe.ts";
import { hasDisplayableText } from "../utils/ingredientsUtils.ts";

function RecipeDetailsPage() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

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
                <div className="recipe-details-message recipe-details-error">
                    Recipe ID is missing.
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="recipe-details-page">
                <div className="recipe-details-message">
                    Loading recipe details...
                </div>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="recipe-details-page">
                <button
                    type="button"
                    className="recipe-back-button"
                    onClick={() => navigate("/recipes")}
                >
                    <ArrowLeft size={18} />
                    Back to recipes
                </button>

                <div className="recipe-details-message recipe-details-error">
                    {error || "Recipe not found."}
                </div>
            </div>
        );
    }

    const instructions = (recipe.instructions || "")
        .split(/\r?\n/)
        .map((step) => step.trim())
        .filter(Boolean);

    const checkedCount = checkedIngredients.length;
    const totalIngredients = recipe.ingredients.length;

    const progress = totalIngredients ? (checkedCount / totalIngredients) * 100 : 0;

    return (
        <div className="recipe-details-page">
            <section className="recipe-detail-hero">
                <div>
                    <span className="recipe-detail-tag">
                        <ChefHat size={16} />
                        Recipe Details
                    </span>

                    <h1>{recipe.name}</h1>

                    <p className="recipe-detail-description">
                        Discover delicious ways to use your ingredients and keep good food from going to waste.
                    </p>

                    <div className="recipe-detail-meta">
                        {hasDisplayableText(recipe.category) && (
                            <span className="recipe-detail-tag">{recipe.category}</span>
                        )}

                        {hasDisplayableText(recipe.cuisine) && (
                            <span className="recipe-detail-tag">{recipe.cuisine}</span>
                        )}
                    </div>
                </div>

                <img src={recipe.imageUrl} alt={recipe.name} className="recipe-detail-hero-image"/>
            </section>

            <div className="recipe-detail-layout">
                <section className="recipe-detail-section">
                    <div className="recipe-section-heading">
                        <div className="recipe-section-icon">
                            <Utensils size={21} />
                        </div>

                        <div>
                            <h2>Ingredients</h2>
                            <p>{checkedCount} of {totalIngredients} prepared</p>
                        </div>
                    </div>

                    <div
                        className="ingredient-progress"
                        role="progressbar"
                        aria-label="Ingredients prepared"
                        aria-valuenow={checkedCount}
                        aria-valuemin={0}
                        aria-valuemax={totalIngredients}
                    >
                        <div
                            className="ingredient-progress-bar"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="recipe-ingredients-list">
                        {recipe.ingredients.map((ingredient, index) => {
                            const checked = checkedIngredients.includes(index);

                            const isExpiringSoon = expiringIngredients.some(
                                (item) =>
                                    item.trim().toLowerCase() ===
                                    ingredient.trim().toLowerCase()
                            );

                            const measurement = recipe.measurements[index];

                            return (
                                <label
                                    key={`${ingredient}-${index}`}
                                    className={`recipe-detail-ingredient ${
                                        checked ? "ingredient-checked" : ""
                                    } ${
                                        isExpiringSoon ? "ingredient-expiring" : ""
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleIngredient(index)}
                                    />

                                    <span className="ingredient-checkmark">
                                        {checked && <Check size={14} />}
                                    </span>

                                    <span className="ingredient-name">
                                        {ingredient}
                                    </span>

                                    {isExpiringSoon && (
                                        <span className="expiring-ingredient-badge">
                                            <span className="expiring-ingredient-dot" />
                                            Expiring soon
                                        </span>
                                    )}

                                    {measurement && (
                                        <span className="ingredient-measurement">
                                            {measurement}
                                        </span>
                                    )}
                                </label>
                            );
                        })}
                    </div>

                    {checkedCount === totalIngredients &&
                        totalIngredients > 0 && (
                            <p className="ingredients-complete">
                                All ingredients are ready. Let's start cooking!
                            </p>
                        )}
                </section>

                <section className="recipe-detail-section instructions-section">
                    <div className="recipe-section-heading">
                        <div className="recipe-section-icon">
                            <ChefHat size={21} />
                        </div>

                        <div>
                            <h2>Cooking Instructions</h2>
                            <p>Follow the steps to prepare your meal.</p>
                        </div>
                    </div>

                    {instructions.length > 0 ? (
                        <ol className="recipe-instructions-list">
                            {instructions.map((instruction, index) => (
                                <li key={`${index}-${instruction.slice(0, 20)}`}>
                                    <span className="instruction-number">
                                        {index + 1}
                                    </span>
                                    <p>{instruction}</p>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="recipe-instructions-empty">
                            No cooking instructions are available for this recipe.
                        </p>
                    )}
                </section>
            </div>

            <div className="recipe-details-back">
                <button
                    type="button"
                    className="recipe-back-button"
                    onClick={() => navigate("/recipes")}
                >
                    <ArrowLeft size={18} />
                    <span>Back to Recipes</span>
                </button>
            </div>

        </div>
    );
}

export default RecipeDetailsPage;