package com.freshtrack.backend.mapper;

import com.freshtrack.backend.dto.GroceryItemResponse;
import com.freshtrack.backend.entity.GroceryItem;
import com.freshtrack.backend.util.GroceryStatusUtil;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", imports = { GroceryStatusUtil.class })
public interface GroceryItemMapper {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(target = "status", expression = "java(GroceryStatusUtil.determineStatus(groceryItem.getExpirationDate()))")
    GroceryItemResponse toResponse(GroceryItem groceryItem);
}
