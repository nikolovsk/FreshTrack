package com.freshtrack.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryDto(
        Long id,

        @NotBlank(message = "Category name cannot be empty")
        @Size(max = 100, message = "Category name must be at most 100 characters")
        String name
) {
}
