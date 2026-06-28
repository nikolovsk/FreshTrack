package com.freshtrack.backend.service;

import com.freshtrack.backend.dto.GroceryItemFilter;
import com.freshtrack.backend.dto.GroceryItemRequest;
import com.freshtrack.backend.dto.GroceryItemResponse;
import com.freshtrack.backend.enums.GroceryOutcome;

import java.util.List;

public interface GroceryItemService {

    GroceryItemResponse createGroceryItem(GroceryItemRequest request);

    List<GroceryItemResponse> getUserGroceryItems(GroceryItemFilter filter);

    GroceryItemResponse getGroceryItemById(Long id);

    GroceryItemResponse updateGroceryItem(Long id, GroceryItemRequest request);

    void deleteGroceryItem(Long id);

    void updateOutcome(Long id, GroceryOutcome outcome);
}
