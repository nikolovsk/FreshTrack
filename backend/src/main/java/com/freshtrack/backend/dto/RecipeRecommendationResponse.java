package com.freshtrack.backend.dto;

import java.util.List;

public record RecipeRecommendationResponse(
        String id,
        String name,
        String imageUrl,
        List<String> matchedIngredients
) {
}
