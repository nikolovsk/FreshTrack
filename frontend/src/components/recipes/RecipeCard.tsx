import { ArrowRight, Check } from "lucide-react";
import type { RecipeRecommendation } from "../../types/recipe.ts";

type Props = {
    recipe: RecipeRecommendation;
    onClick?: () => void;
};

function RecipeCard({ recipe, onClick }: Props) {
    const matchedCount = recipe.matchedIngredients.length;

    return (
        <article className="recipe-card">

            <div className="recipe-card-image-wrapper">
                <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="recipe-card-image"
                />

                <div className="recipe-match-badge">
                    <Check size={14} />
                    {matchedCount} expiring ingredient
                    {matchedCount !== 1 ? "s" : ""} matched
                </div>
            </div>

            <div className="recipe-card-content">
                <h2>{recipe.name}</h2>

                <div className="recipe-card-matches">
                    <span className="recipe-card-label">
                        Uses your groceries
                    </span>

                    <div className="recipe-card-ingredients">
                        {recipe.matchedIngredients.map((ingredient) => (
                            <span
                                key={ingredient}
                                className="recipe-ingredient-chip"
                            >
                                {ingredient}
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    className="recipe-card-button"
                    onClick={onClick}
                >
                    <span>View Recipe</span>
                    <ArrowRight size={17} />
                </button>

            </div>
        </article>
    );
}

export default RecipeCard;