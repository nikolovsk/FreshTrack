package com.freshtrack.backend.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.freshtrack.backend.dto.DetectedGroceryResponse;
import com.freshtrack.backend.entity.Category;
import com.freshtrack.backend.repository.CategoryRepository;
import com.freshtrack.backend.service.GroceryRecognitionService;
import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroceryRecognitionServiceImpl implements GroceryRecognitionService {

    private final Client geminiClient;
    private final ObjectMapper objectMapper;
    private final CategoryRepository categoryRepository;

    @Override
    public List<DetectedGroceryResponse> detectGroceries(MultipartFile image) {

        try {
            byte[] imageBytes = image.getBytes();

            List<Category> categories = categoryRepository.findAll();
            String categoryList = categories.stream()
                    .map(category -> category.getId() + " - " + category.getName())
                    .collect(Collectors.joining("\n"));

            String prompt = """
                    Look at this image and identify all visible grocery food items.

                    For every detected grocery item, assign exactly one category
                    from the provided category list.

                    Available categories:
                    %s

                    Return ONLY a valid JSON array.
                    Each item must contain:
                    - "name": the grocery item name
                    - "categoryId": the ID of the selected category

                    Do not include quantities, prices, brands, or descriptions.
                    Do not create new categories.
                    Use only category IDs from the provided list.

                    Example:
                    [
                      {"name": "Milk", "categoryId": 4},
                      {"name": "Tomatoes", "categoryId": 2}
                    ]
                    """.formatted(categoryList);

            Content content = Content.fromParts(Part.fromText(prompt), Part.fromBytes(imageBytes, image.getContentType()));

            GenerateContentResponse response = geminiClient.models.generateContent(
                    "gemini-3.7-flash",
                    content,
                    null
            );

            String responseText = response.text();

            assert responseText != null;
            responseText = responseText
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            try {
                List<DetectedGroceryResponse> detectedGroceries = objectMapper.readValue(
                        responseText,
                        new TypeReference<List<DetectedGroceryResponse>>() {}
                );

                for (DetectedGroceryResponse grocery : detectedGroceries) {
                    boolean categoryExists = categories.stream()
                            .anyMatch(category -> category.getId().equals(grocery.categoryId()));

                    if (!categoryExists) {
                        throw new RuntimeException("Gemini returned an invalid category ID: " + grocery.categoryId());
                    }
                }

                return detectedGroceries;
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse Gemini response.", e);
            }

        } catch (IOException e) {
            throw new RuntimeException("Failed to read uploaded image.", e);
        }
    }
}