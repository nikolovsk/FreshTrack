package com.freshtrack.backend.dto;

import com.freshtrack.backend.enums.GroceryOutcome;
import com.freshtrack.backend.enums.GroceryStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

public record GroceryItemResponse(
        Long id,

        String name,

        Integer quantity,

        BigDecimal price,

        LocalDate purchaseDate,

        LocalDate expirationDate,

        GroceryStatus status,

        GroceryOutcome outcome,

        Long categoryId,

        String categoryName
) {
}
