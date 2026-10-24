import { Check, Utensils } from "lucide-react";

type RecipeIngredientsProps = {
    ingredients: string[];
    measurements: string[];
    expiringIngredients: string[];
    checkedIngredients: number[];
    onToggleIngredient: (index: number) => void;
};

function RecipeIngredients({
                               ingredients,
                               measurements,
                               expiringIngredients,
                               checkedIngredients,
                               onToggleIngredient,
                           }: RecipeIngredientsProps) {
    const checkedCount = checkedIngredients.length;
    const totalIngredients = ingredients.length;

    const progress = totalIngredients ? (checkedCount / totalIngredients) * 100 : 0;

    const normalizedExpiringIngredients = new Set(
        expiringIngredients.map((ingredient) => ingredient.trim().toLowerCase())
    );

    return (
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
                <div className="ingredient-progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <div className="recipe-ingredients-list">
                {ingredients.map((ingredient, index) => {
                    const checked = checkedIngredients.includes(index);

                    const isExpiringSoon = normalizedExpiringIngredients.has(
                        ingredient.trim().toLowerCase()
                    );

                    const measurement = measurements[index];

                    return (
                        <label
                            key={`${ingredient}-${index}`}
                            className={`recipe-detail-ingredient ${checked ? "ingredient-checked" : ""
                            } ${
                                isExpiringSoon ? "ingredient-expiring" : ""
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onToggleIngredient(index)}
                            />

                            <span className="ingredient-checkmark">{checked && <Check size={14} />}</span>

                            <span className="ingredient-name">{ingredient}</span>

                            {isExpiringSoon && (
                                <span className="expiring-ingredient-badge">
                                    <span className="expiring-ingredient-dot" />
                                    Expiring soon
                                </span>
                            )}

                            {measurement && (
                                <span className="ingredient-measurement">{measurement}</span>
                            )}
                        </label>
                    );
                })}
            </div>

            {checkedCount === totalIngredients && totalIngredients > 0 && (
                <p className="ingredients-complete">All ingredients are ready. Let's start cooking!</p>
            )}
        </section>
    );
}

export default RecipeIngredients;