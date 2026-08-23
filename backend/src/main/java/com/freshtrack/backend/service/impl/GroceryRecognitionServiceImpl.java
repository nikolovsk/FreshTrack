package com.freshtrack.backend.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.freshtrack.backend.dto.DetectedGroceryResponse;
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

@Service
@RequiredArgsConstructor
public class GroceryRecognitionServiceImpl implements GroceryRecognitionService {

    private final Client geminiClient;
    private final ObjectMapper objectMapper;

    @Override
    public List<DetectedGroceryResponse> detectGroceries(MultipartFile image) {

        try {
            byte[] imageBytes = image.getBytes();

            Content content = Content.fromParts(
                    Part.fromText("""
                Look at this image and identify all visible grocery food items.

                Return ONLY a valid JSON array.
                Each item must be an object with exactly one field: "name".

                Example:
                [
                  {"name": "Eggs"},
                  {"name": "Tomatoes"},
                  {"name": "Milk"}
                ]

                Rules:
                - Include only visible grocery food items.
                - Do not include quantities.
                - Do not include prices.
                - Do not include categories.
                - Do not include brands.
                - Do not include descriptions.
                - Do not include markdown.
                - Do not include ```json.
                - Return only the JSON array.
                """),
                    Part.fromBytes(imageBytes, image.getContentType())
            );

            GenerateContentResponse response = geminiClient.models.generateContent(
                    "gemini-3.7-flash",
                    content,
                    null
            );

            String responseText = response.text();

            try {
                return objectMapper.readValue(
                        responseText,
                        new TypeReference<List<DetectedGroceryResponse>>() {}
                );
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse Gemini response.", e);
            }

        } catch (IOException e) {
            throw new RuntimeException("Failed to read uploaded image.", e);
        }
    }
}