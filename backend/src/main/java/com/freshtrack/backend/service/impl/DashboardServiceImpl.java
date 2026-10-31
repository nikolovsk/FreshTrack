package com.freshtrack.backend.service.impl;

import com.freshtrack.backend.dto.DashboardChartsResponse;
import com.freshtrack.backend.dto.DashboardInsightsResponse;
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

        Map<YearMonth, Long> monthlyConsumedCount = new TreeMap<>();
        Map<YearMonth, Long> monthlyWastedCount = new TreeMap<>();

        Map<String, BigDecimal> categorySpending = new TreeMap<>();

        groceries.stream()
                .filter(grocery -> grocery.getPurchaseDate() != null)
                .filter(grocery ->
                        !grocery.getPurchaseDate().isBefore(startDate)
                                && !grocery.getPurchaseDate().isAfter(endDate))
                .filter(grocery -> grocery.getCategory() != null)
                .filter(grocery -> grocery.getPrice() != null)
                .forEach(grocery -> categorySpending.merge(
                        grocery.getCategory().getName(),
                        grocery.getPrice(),
                        BigDecimal::add
                ));

        List<DashboardChartsResponse.CategorySpending> spendingByCategory =
                categorySpending.entrySet().stream()
                        .map(entry -> new DashboardChartsResponse.CategorySpending(
                                entry.getKey(),
                                entry.getValue()
                        ))
                        .toList();

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
                        monthlyConsumedCount.merge(month, 1L, Long::sum);

                        if (grocery.getPrice() != null) {
                            monthlyConsumedSpending.merge(month, grocery.getPrice(), BigDecimal::add);
                        }
                    } else {
                        monthlyWastedCount.merge(month, 1L, Long::sum);

                        if (grocery.getPrice() != null) {
                            monthlyWastedSpending.merge(month, grocery.getPrice(), BigDecimal::add);
                        }
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
                            wastedSpending
                    )
            );

            currentMonth = currentMonth.plusMonths(1);
        }

        List<DashboardChartsResponse.MonthlyWasteRate> monthlyWasteRate = new ArrayList<>();
        currentMonth = YearMonth.from(startDate);

        while (!currentMonth.isAfter(lastMonth)) {
            long consumed = monthlyConsumedCount.getOrDefault(currentMonth, 0L);
            long wasted = monthlyWastedCount.getOrDefault(currentMonth, 0L);

            long totalOutcomes = consumed + wasted;

            double wasteRate = totalOutcomes == 0 ? 0.0 : (double) wasted / totalOutcomes * 100;

            monthlyWasteRate.add(
                    new DashboardChartsResponse.MonthlyWasteRate(
                            currentMonth.toString(),
                            consumed,
                            wasted,
                            wasteRate
                    )
            );

            currentMonth = currentMonth.plusMonths(1);
        }

        long itemsConsumed = countOutcomesInPeriod(groceries, GroceryOutcome.CONSUMED, startDate, endDate);
        long itemsWasted = countOutcomesInPeriod(groceries, GroceryOutcome.WASTED, startDate, endDate);

        return new DashboardChartsResponse(
                spendingOverTime,
                itemsConsumed,
                itemsWasted,
                spendingByCategory,
                monthlyWasteRate
        );
    }

    @Override
    public DashboardInsightsResponse getDashboardInsights(LocalDate startDate, LocalDate endDate) {
        DashboardSummaryResponse summary = getDashboardSummary(startDate, endDate);
        DashboardChartsResponse charts = getDashboardCharts(startDate, endDate);

        List<DashboardInsightsResponse.Insight> insights = new ArrayList<>();

        long currentOutcomes = summary.itemsConsumed() + summary.itemsWasted();
        long previousOutcomes = summary.previousItemsConsumed() + summary.previousItemsWasted();

        if (currentOutcomes > 0 && previousOutcomes > 0) {
            double currentWasteRate = (double) summary.itemsWasted() / currentOutcomes * 100;
            double previousWasteRate = (double) summary.previousItemsWasted() / previousOutcomes * 100;
            double difference = currentWasteRate - previousWasteRate;

            if (Math.abs(difference) >= 0.1) {
                boolean improved = difference < 0;

                insights.add(new DashboardInsightsResponse.Insight(
                        "WASTE_TREND",
                        improved ? "Waste rate improved" : "Waste rate increased",
                        String.format(
                                Locale.US,
                                "Your waste rate %s by %.1f percentage points compared with the previous period.",
                                improved ? "decreased" : "increased",
                                Math.abs(difference)
                        ),
                        String.format(Locale.US, "%.1f%%", currentWasteRate),
                        improved ? "POSITIVE" : "NEGATIVE"
                ));
            } else {
                insights.add(new DashboardInsightsResponse.Insight(
                        "WASTE_TREND",
                        "Waste rate remained stable",
                        "Your waste rate stayed almost the same compared with the previous period.",
                        String.format(Locale.US, "%.1f%%", currentWasteRate),
                        "NEUTRAL"
                ));
            }
        }

        charts.spendingByCategory().stream()
                .max(Comparator.comparing(DashboardChartsResponse.CategorySpending::totalSpending))
                .ifPresent(category -> {
                    insights.add(new DashboardInsightsResponse.Insight(
                            "TOP_CATEGORY",
                            "Top spending category",
                            "This is the category where you spent the most during the selected period.",
                            category.categoryName(),
                            "NEUTRAL"
                    ));
                });

        if (summary.totalWastedSpending().compareTo(BigDecimal.ZERO) > 0) {
            insights.add(new DashboardInsightsResponse.Insight(
                    "MONEY_LOST",
                    "Money lost to food waste",
                    "This is the total value of groceries marked as wasted during the selected period.",
                    summary.totalWastedSpending().toPlainString() + " MKD",
                    "NEGATIVE"
            ));
        }

        BigDecimal currentSpending = summary.totalSpending();
        BigDecimal previousSpending = summary.previousTotalSpending();

        if (previousSpending.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal percentageChange = currentSpending
                    .subtract(previousSpending)
                    .multiply(BigDecimal.valueOf(100))
                    .divide(previousSpending, 1, java.math.RoundingMode.HALF_UP);

            int comparison = percentageChange.compareTo(BigDecimal.ZERO);

            if (comparison != 0) {
                boolean increased = comparison > 0;

                insights.add(new DashboardInsightsResponse.Insight(
                        "SPENDING_TREND",
                        increased ? "Spending increased" : "Spending decreased",
                        String.format(
                                Locale.US,
                                "Your grocery spending %s by %.1f%% compared with the previous period.",
                                increased ? "increased" : "decreased",
                                percentageChange.abs().doubleValue()
                        ),
                        String.format(Locale.US, "%.1f%%", percentageChange.abs().doubleValue()),
                        increased ? "NEGATIVE" : "POSITIVE"
                ));
            }
        }

        return new DashboardInsightsResponse(insights);
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
                    return !outcomeDate.isBefore(startDate)
                            && !outcomeDate.isAfter(endDate);
                })
                .count();
    }

    private BigDecimal calculateWastedSpending(List<GroceryItem> groceries, LocalDate startDate, LocalDate endDate) {
        return groceries.stream()
                .filter(grocery -> grocery.getOutcome() == GroceryOutcome.WASTED)
                .filter(grocery -> grocery.getUpdatedAt() != null)
                .filter(grocery -> {
                    LocalDate outcomeDate = grocery.getUpdatedAt().toLocalDate();
                    return !outcomeDate.isBefore(startDate)
                            && !outcomeDate.isAfter(endDate);
                })
                .map(GroceryItem::getPrice)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}