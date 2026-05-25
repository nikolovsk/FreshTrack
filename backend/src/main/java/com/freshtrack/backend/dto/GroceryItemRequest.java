package com.freshtrack.backend.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record GroceryItemRequest(

        @NotBlank(message = "Grocery item name cannot be empty")
        @Size(max = 150, message = "Grocery item name must be at most 150 characters")
        String name,

        @NotNull(message = "Quantity is required")
        @Positive(message = "Quantity must be greater than 0")
        Integer quantity,

        @PositiveOrZero(message = "Price cannot be negative ")
        BigDecimal price,

        @NotNull(message = "Purchase date is required")
        LocalDate purchaseDate,

        @NotNull(message = "Expiration date is required")
        LocalDate expirationDate,

        @NotNull(message = "Category is required")
        Long categoryId
) {
}
