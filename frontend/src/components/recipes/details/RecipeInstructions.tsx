import { ChefHat } from "lucide-react";

type RecipeInstructionsProps = {
    instructions: string[];
};

function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
    return (
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
    );
}

export default RecipeInstructions;