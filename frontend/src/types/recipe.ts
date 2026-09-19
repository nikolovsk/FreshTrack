export type Recipe = {
    id: string;
    name: string;
    imageUrl: string;
    category: string | null;
    cuisine: string | null;
    ingredients: string[];
    measurements: string[];
    instructions: string | null;
};

export type RecipeRecommendation = {
    id: string;
    name: string;
    imageUrl: string;
    matchedIngredients: string[];
};