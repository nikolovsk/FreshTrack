package com.freshtrack.backend.dto;

import java.util.List;

public record RecipeResponse(
        String id,
        String name,
        String imageUrl,
        String category,
        String cuisine,
        List<String> ingredients,
        List<String> measurements,
        String instructions
) {
}
