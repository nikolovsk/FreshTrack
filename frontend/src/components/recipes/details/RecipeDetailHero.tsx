import { ChefHat } from "lucide-react";
import type { Recipe } from "../../../types/recipe.ts";
import { hasDisplayableText } from "../../../utils/ingredientsUtils.ts";

type RecipeDetailHeroProps = {
    recipe: Recipe;
    description: string;
};

function RecipeDetailHero({ recipe, description }: RecipeDetailHeroProps) {
    return (
        <section className="recipe-detail-hero">
            <div>
                <span className="recipe-detail-tag">
                    <ChefHat size={16} />
                    Recipe Details
                </span>

                <h1>{recipe.name}</h1>

                <p className="recipe-detail-description">{description}</p>

                <div className="recipe-detail-meta">
                    {hasDisplayableText(recipe.category) && (
                        <span className="recipe-detail-tag">
                            {recipe.category}
                        </span>
                    )}

                    {hasDisplayableText(recipe.cuisine) && (
                        <span className="recipe-detail-tag">
                            {recipe.cuisine}
                        </span>
                    )}
                </div>
            </div>

            <img src={recipe.imageUrl} alt={recipe.name} className="recipe-detail-hero-image"/>
        </section>
    );
}

export default RecipeDetailHero;