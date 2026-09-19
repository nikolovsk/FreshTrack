import { ChefHat, Sparkles } from "lucide-react";

function RecipesHeader() {
    return (
        <section className="recipes-header">
            <div className="recipes-header-content">
                <div className="recipes-header-icon">
                    <ChefHat size={24} />
                </div>

                <span className="recipes-header-tag">
                    <Sparkles size={14} />
                    Smart Recipe Suggestions
                </span>

                <h1>Turn your groceries into something delicious.</h1>
                <p>Discover recipes that help you use your groceries before they expire and reduce unnecessary food waste.</p>
            </div>
        </section>
    );
}

export default RecipesHeader;