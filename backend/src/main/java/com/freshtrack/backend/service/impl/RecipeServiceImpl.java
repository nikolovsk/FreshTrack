package com.freshtrack.backend.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.freshtrack.backend.dto.RecipeResponse;
import com.freshtrack.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Override
    public List<RecipeResponse> getRecipesByIngredient(String ingredient) {

        String response = restClient.get()
                .uri("https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}", ingredient)
                .retrieve()
                .body(String.class);

        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode meals = root.get("meals");

            if (meals == null || meals.isNull()) {
                return List.of();
            }

            List<RecipeResponse> recipes = new ArrayList<>();

            for (JsonNode meal : meals) {
                recipes.add(new RecipeResponse(
                        meal.get("idMeal").asText(),
                        meal.get("strMeal").asText(),
                        meal.get("strMealThumb").asText(),
                        null,
                        null,
                        List.of(),
                        List.of(),
                        null
                ));
            }

            return recipes;

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse recipe API response.", e);
        }
    }

    @Override
    public RecipeResponse getRecipeById(String id) {

        String response = restClient.get()
                .uri("https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}", id)
                .retrieve()
                .body(String.class);

        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode meals = root.get("meals");

            if (meals == null || meals.isNull() || meals.isEmpty()) {
                return null;
            }

            JsonNode meal = meals.get(0);

            List<String> ingredients = new ArrayList<>();
            List<String> measurements = new ArrayList<>();

            for (int i = 1; i <= 20; i++) {
                JsonNode ingredientNode = meal.get("strIngredient" + i);
                JsonNode measurementNode = meal.get("strMeasure" + i);

                if (ingredientNode != null && !ingredientNode.isNull() && !ingredientNode.asText().isBlank()) {
                    ingredients.add(ingredientNode.asText());

                    if (measurementNode != null && !measurementNode.isNull() && !measurementNode.asText().isBlank()) {
                        measurements.add(measurementNode.asText());
                    } else {
                        measurements.add("");
                    }
                }
            }

            return new RecipeResponse(
                    meal.get("idMeal").asText(),
                    meal.get("strMeal").asText(),
                    meal.get("strMealThumb").asText(),
                    meal.get("strCategory").asText(),
                    meal.get("strArea").asText(),
                    ingredients,
                    measurements,
                    meal.get("strInstructions").asText()
            );

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse recipe details.", e);
        }
    }
}
