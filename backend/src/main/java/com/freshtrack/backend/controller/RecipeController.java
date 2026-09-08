package com.freshtrack.backend.controller;

import com.freshtrack.backend.dto.RecipeResponse;
import com.freshtrack.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping
    public ResponseEntity<List<RecipeResponse>> getRecipes(@RequestParam String ingredient) {
        return ResponseEntity.ok(recipeService.getRecipesByIngredient(ingredient));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponse> getRecipeById(@PathVariable String id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }
}
