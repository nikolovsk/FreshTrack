package com.freshtrack.backend.service;

import com.freshtrack.backend.dto.GroceryItemRequest;
import com.freshtrack.backend.dto.GroceryItemResponse;

import java.util.List;

public interface GroceryItemService {

    GroceryItemResponse createGroceryItem(GroceryItemRequest request);

    List<GroceryItemResponse> getUserGroceryItems();

    GroceryItemResponse getGroceryItemById(Long id);

    GroceryItemResponse updateGroceryItem(Long id, GroceryItemRequest request);

    void deleteGroceryItem(Long id);
}
