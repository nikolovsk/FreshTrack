package com.freshtrack.backend.service.impl;

import com.freshtrack.backend.dto.DashboardChartsResponse;
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
import java.time.YearMonth;
import java.util.*;

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

        long periodDays = java.time.temporal.ChronoUnit.DAYS.between(startDate, endDate) + 1;
        LocalDate previousEndDate = startDate.minusDays(1);
        LocalDate previousStartDate = previousEndDate.minusDays(periodDays - 1);

        List<GroceryItem> groceriesInPeriod = groceries.stream()
                .filter(grocery ->
                        !grocery.getPurchaseDate().isBefore(startDate)
                                && !grocery.getPurchaseDate().isAfter(endDate))
                .toList();

        long groceriesPurchased = groceriesInPeriod.size();

        BigDecimal totalSpending = groceriesInPeriod.stream()
                .map(GroceryItem::getPrice)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long itemsConsumed = countOutcomesInPeriod(groceries, GroceryOutcome.CONSUMED, startDate, endDate);
        long itemsWasted = countOutcomesInPeriod(groceries, GroceryOutcome.WASTED, startDate, endDate);
        BigDecimal totalWastedSpending = calculateWastedSpending(groceries, startDate, endDate);

        List<GroceryItem> previousGroceriesInPeriod = groceries.stream()
                .filter(grocery ->
                        !grocery.getPurchaseDate().isBefore(previousStartDate)
                                && !grocery.getPurchaseDate().isAfter(previousEndDate))
                .toList();

        long previousGroceriesPurchased = previousGroceriesInPeriod.size();

        BigDecimal previousTotalSpending = previousGroceriesInPeriod.stream()
                .map(GroceryItem::getPrice)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long previousItemsConsumed = countOutcomesInPeriod(groceries, GroceryOutcome.CONSUMED, previousStartDate, previousEndDate);

        long previousItemsWasted = countOutcomesInPeriod(groceries, GroceryOutcome.WASTED, previousStartDate, previousEndDate);

        BigDecimal previousTotalWastedSpending = calculateWastedSpending(groceries, previousStartDate, previousEndDate);

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
                totalWastedSpending,
                freshItems,
                expiringSoonItems,
                expiredItems,
                previousGroceriesPurchased,
                previousTotalSpending,
                previousItemsConsumed,
                previousItemsWasted,
                previousTotalWastedSpending
        );
    }

    @Override
    public DashboardChartsResponse getDashboardCharts(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null || startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Invalid dashboard date range.");
        }

        Long userId = getLoggedInUserId();
        List<GroceryItem> groceries = groceryItemRepository.findByUserId(userId);

        Map<YearMonth, BigDecimal> monthlyConsumedSpending = new TreeMap<>();
        Map<YearMonth, BigDecimal> monthlyWastedSpending = new TreeMap<>();

        groceries.stream()
                .filter(grocery -> grocery.getOutcome() == GroceryOutcome.CONSUMED
                        || grocery.getOutcome() == GroceryOutcome.WASTED)
                .filter(grocery -> grocery.getUpdatedAt() != null)
                .filter(grocery -> {
                    LocalDate outcomeDate = grocery.getUpdatedAt().toLocalDate();
                    return !outcomeDate.isBefore(startDate) && !outcomeDate.isAfter(endDate);
                })
                .forEach(grocery -> {
                    YearMonth month = YearMonth.from(grocery.getUpdatedAt());

                    if (grocery.getOutcome() == GroceryOutcome.CONSUMED) {
                        monthlyConsumedSpending.merge(month, grocery.getPrice(), BigDecimal::add);
                    } else {
                        monthlyWastedSpending.merge(month, grocery.getPrice(), BigDecimal::add);
                    }
                });

        List<DashboardChartsResponse.MonthlySpending> spendingOverTime = new ArrayList<>();

        YearMonth currentMonth = YearMonth.from(startDate);
        YearMonth lastMonth = YearMonth.from(endDate);

        while (!currentMonth.isAfter(lastMonth)) {
            BigDecimal consumedSpending = monthlyConsumedSpending.getOrDefault(currentMonth, BigDecimal.ZERO);
            BigDecimal wastedSpending = monthlyWastedSpending.getOrDefault(currentMonth, BigDecimal.ZERO);
            BigDecimal totalSpending = consumedSpending.add(wastedSpending);

            spendingOverTime.add(
                    new DashboardChartsResponse.MonthlySpending(
                            currentMonth.toString(),
                            totalSpending,
                            wastedSpending)
            );

            currentMonth = currentMonth.plusMonths(1);
        }

        long itemsConsumed = countOutcomesInPeriod(groceries, GroceryOutcome.CONSUMED, startDate, endDate);
        long itemsWasted = countOutcomesInPeriod(groceries, GroceryOutcome.WASTED, startDate, endDate);

        return new DashboardChartsResponse(spendingOverTime, itemsConsumed, itemsWasted);
    }

    private Long getLoggedInUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email)).getId();
    }

    private long countOutcomesInPeriod(
            List<GroceryItem> groceries,
            GroceryOutcome outcome,
            LocalDate startDate,
            LocalDate endDate
    ) {
        return groceries.stream()
                .filter(grocery -> grocery.getOutcome() == outcome)
                .filter(grocery -> grocery.getUpdatedAt() != null)
                .filter(grocery -> {
                    LocalDate outcomeDate = grocery.getUpdatedAt().toLocalDate();
                    return !outcomeDate.isBefore(startDate) && !outcomeDate.isAfter(endDate);
                })
                .count();
    }

    private BigDecimal calculateWastedSpending(List<GroceryItem> groceries, LocalDate startDate, LocalDate endDate) {
        return groceries.stream()
                .filter(grocery -> grocery.getOutcome() == GroceryOutcome.WASTED)
                .filter(grocery -> grocery.getUpdatedAt() != null)
                .filter(grocery -> {
                    LocalDate outcomeDate = grocery.getUpdatedAt().toLocalDate();
                    return !outcomeDate.isBefore(startDate) && !outcomeDate.isAfter(endDate);
                })
                .map(GroceryItem::getPrice)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}