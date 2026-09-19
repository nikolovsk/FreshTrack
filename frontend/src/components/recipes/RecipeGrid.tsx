import type { RecipeRecommendation } from "../../types/recipe.ts";
import RecipeCard from "./RecipeCard.tsx";

type Props = {
    recipes: RecipeRecommendation[];
    onRecipeClick?: (id: string) => void;
};

function RecipeGrid({ recipes, onRecipeClick }: Props) {
    return (
        <div className="recipe-grid">
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => onRecipeClick?.(recipe.id)}
                />
            ))}
        </div>
    );
}

export default RecipeGrid;