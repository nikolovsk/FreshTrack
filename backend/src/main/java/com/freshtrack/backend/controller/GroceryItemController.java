package com.freshtrack.backend.controller;

import com.freshtrack.backend.dto.GroceryItemFilter;
import com.freshtrack.backend.dto.GroceryItemRequest;
import com.freshtrack.backend.dto.GroceryItemResponse;
import com.freshtrack.backend.service.GroceryItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groceries")
@RequiredArgsConstructor
public class GroceryItemController {

    private final GroceryItemService groceryItemService;

    @PostMapping
    public ResponseEntity<GroceryItemResponse> createGrocery(@Valid @RequestBody GroceryItemRequest request) {
        return new ResponseEntity<>(groceryItemService.createGroceryItem(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GroceryItemResponse>> getAllGroceries(@ModelAttribute GroceryItemFilter filter) {
        return ResponseEntity.ok(groceryItemService.getUserGroceryItems(filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroceryItemResponse> getGroceryById(@PathVariable Long id) {
        return ResponseEntity.ok(groceryItemService.getGroceryItemById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroceryItemResponse> updateGrocery(@PathVariable Long id,
                                                             @Valid @RequestBody GroceryItemRequest request) {
        return ResponseEntity.ok(groceryItemService.updateGroceryItem(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrocery(@PathVariable Long id) {
        groceryItemService.deleteGroceryItem(id);

        return ResponseEntity.noContent().build();
    }
}
