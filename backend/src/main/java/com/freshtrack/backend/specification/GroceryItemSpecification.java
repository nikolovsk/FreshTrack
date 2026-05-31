package com.freshtrack.backend.specification;

import com.freshtrack.backend.entity.GroceryItem;
import com.freshtrack.backend.enums.GroceryStatus;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

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

            LocalDate today = LocalDate.now();

            Expression<LocalDate> expirationDate = root.get("expirationDate");

            return switch (status) {
                case EXPIRED -> criteriaBuilder.lessThan(expirationDate, today);
                case EXPIRING_SOON -> criteriaBuilder.between(expirationDate, today, today.plusDays(2));
                case FRESH -> criteriaBuilder.greaterThanOrEqualTo(expirationDate, today.plusDays(3));
            };
        };
    }
}
