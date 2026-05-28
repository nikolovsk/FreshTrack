package com.freshtrack.backend.dto;

import com.freshtrack.backend.enums.GroceryStatus;

public record GroceryItemFilter(
        String search,
        Long categoryId,
        GroceryStatus status
) {
}
