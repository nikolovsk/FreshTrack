package com.freshtrack.backend.service.impl;

import com.freshtrack.backend.dto.DashboardSummaryResponse;
import com.freshtrack.backend.entity.GroceryItem;
import com.freshtrack.backend.enums.GroceryOutcome;
import com.freshtrack.backend.enums.GroceryStatus;
import com.freshtrack.backend.exception.UserNotFoundException;
import com.freshtrack.backend.repository.GroceryItemRepository;
import com.freshtrack.backend.repository.UserRepository;
import com.freshtrack.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final GroceryItemRepository groceryItemRepository;
    private final UserRepository userRepository;

    @Override
    public DashboardSummaryResponse getDashboardSummary(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null || startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Invalid dashboard date range.");
        }

        Long userId = getLoggedInUserId();
        List<GroceryItem> groceries = groceryItemRepository.findByUserId(userId);

        List<GroceryItem> groceriesInPeriod = groceries.stream()
                .filter(grocery ->
                        !grocery.getPurchaseDate().isBefore(startDate)
                                && !grocery.getPurchaseDate().isAfter(endDate))
                .toList();

        long groceriesPurchased = groceriesInPeriod.size();

        BigDecimal totalSpending = groceriesInPeriod.stream()
                .map(GroceryItem::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long itemsConsumed = groceries.stream()
                .filter(grocery -> grocery.getOutcome() == GroceryOutcome.CONSUMED)
                .filter(grocery -> grocery.getUpdatedAt() != null)
                .filter(grocery -> {
                    LocalDate outcomeDate = grocery.getUpdatedAt().toLocalDate();
                    return !outcomeDate.isBefore(startDate) && !outcomeDate.isAfter(endDate);
                })
                .count();

        long itemsWasted = groceries.stream()
                .filter(grocery -> grocery.getOutcome() == GroceryOutcome.WASTED)
                .filter(grocery -> grocery.getUpdatedAt() != null)
                .filter(grocery -> {
                    LocalDate outcomeDate = grocery.getUpdatedAt().toLocalDate();
                    return !outcomeDate.isBefore(startDate) && !outcomeDate.isAfter(endDate);
                })
                .count();

        long freshItems = groceries.stream()
                .filter(grocery -> grocery.getOutcome() == GroceryOutcome.ACTIVE)
                .filter(grocery -> grocery.getStatus() == GroceryStatus.FRESH)
                .count();

        long expiringSoonItems = groceries.stream()
                .filter(grocery -> grocery.getOutcome() == GroceryOutcome.ACTIVE)
                .filter(grocery -> grocery.getStatus() == GroceryStatus.EXPIRING_SOON)
                .count();

        long expiredItems = groceries.stream()
                .filter(grocery -> grocery.getOutcome() == GroceryOutcome.ACTIVE)
                .filter(grocery -> grocery.getStatus() == GroceryStatus.EXPIRED)
                .count();

        return new DashboardSummaryResponse(
                groceriesPurchased,
                totalSpending,
                itemsConsumed,
                itemsWasted,
                freshItems,
                expiringSoonItems,
                expiredItems
        );
    }

    private Long getLoggedInUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email)).getId();
    }
}