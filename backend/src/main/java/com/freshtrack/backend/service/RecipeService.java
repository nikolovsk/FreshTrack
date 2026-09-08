package com.freshtrack.backend.service;

import com.freshtrack.backend.dto.RecipeResponse;

import java.util.List;

public interface RecipeService {

    List<RecipeResponse> getRecipesByIngredient(String ingredient);

    RecipeResponse getRecipeById(String id);
}
