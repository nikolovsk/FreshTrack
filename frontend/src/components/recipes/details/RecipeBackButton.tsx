import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type RecipeBackButtonProps = {
    className?: string;
    label?: string;
};

function RecipeBackButton({ className = "recipe-back-button", label = "Back to Recipes" }: RecipeBackButtonProps) {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className={className}
            onClick={() => navigate("/recipes")}
        >
            <ArrowLeft size={18} />
            <span>{label}</span>
        </button>
    );
}

export default RecipeBackButton;