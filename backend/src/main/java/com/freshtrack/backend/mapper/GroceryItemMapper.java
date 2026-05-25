package com.freshtrack.backend.mapper;

import com.freshtrack.backend.dto.GroceryItemResponse;
import com.freshtrack.backend.entity.GroceryItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GroceryItemMapper {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    GroceryItemResponse toResponse(GroceryItem groceryItem);
}
