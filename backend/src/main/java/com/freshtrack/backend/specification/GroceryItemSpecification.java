package com.freshtrack.backend.specification;

import com.freshtrack.backend.entity.GroceryItem;
import com.freshtrack.backend.enums.GroceryStatus;
import org.springframework.data.jpa.domain.Specification;

public class GroceryItemSpecification {

    public static Specification<GroceryItem> hasUserId(Long userId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("user").get("id"), userId);
    }

    public static Specification<GroceryItem> nameContains(String search) {
        return (root, query, criteriaBuilder) ->
        {
            if (search == null || search.isBlank()) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),
                    "%" + search.toLowerCase() + "%");
        };
    }

    public static Specification<GroceryItem> hasCategory(Long categoryId) {
        return (root, query, criteriaBuilder) ->
        {
            if (categoryId == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(root.get("category").get("id"), categoryId);
        };
    }

    public static Specification<GroceryItem> hasStatus(GroceryStatus status) {
        return (root, query, criteriaBuilder) ->
        {
            if (status == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(root.get("status"), status);
        };
    }
}
