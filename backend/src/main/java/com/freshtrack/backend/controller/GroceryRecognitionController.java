package com.freshtrack.backend.controller;

import com.freshtrack.backend.dto.DetectedGroceryResponse;
import com.freshtrack.backend.service.GroceryRecognitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/groceries")
@RequiredArgsConstructor
public class GroceryRecognitionController {

    private final GroceryRecognitionService groceryRecognitionService;

    @PostMapping("/recognize")
    public ResponseEntity<List<DetectedGroceryResponse>> recognizeGroceries(@RequestParam("image") MultipartFile image) {
        return ResponseEntity.ok(groceryRecognitionService.detectGroceries(image));
    }
}