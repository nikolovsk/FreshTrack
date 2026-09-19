import api from "../api/axios.ts";
import type { Recipe, RecipeRecommendation } from "../types/recipe.ts";

export async function getRecommendedRecipes(): Promise<RecipeRecommendation[]> {
    const response = await api.get<RecipeRecommendation[]>("/api/recipes/use-soon");

    return response.data;
}

export async function getRecipeById(id: string): Promise<Recipe> {
    const response = await api.get<Recipe>(`/api/recipes/${id}`);

    return response.data;
}