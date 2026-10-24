type RecipeDetailsMessageProps = {
    message: string;
    variant?: "default" | "error";
};

function RecipeDetailsMessage({ message, variant = "default" }: RecipeDetailsMessageProps) {
    return (
        <div
            className={`recipe-details-message ${variant === "error" ? "recipe-details-error" : ""}`}
            role={variant === "error" ? "alert" : "status"}
        >
            {message}
        </div>
    );
}

export default RecipeDetailsMessage;