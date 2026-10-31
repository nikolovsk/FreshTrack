package com.freshtrack.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public record DashboardChartsResponse(
        List<MonthlySpending> spendingOverTime,
        long itemsConsumed,
        long itemsWasted,
        List<CategorySpending> spendingByCategory,
        List<MonthlyWasteRate> monthlyWasteRate
) {
    public record MonthlySpending(
            String month,
            BigDecimal totalSpending,
            BigDecimal wastedSpending
    ) {}

    public record CategorySpending(
            String categoryName,
            BigDecimal totalSpending
    ) {}

    public record MonthlyWasteRate(
            String month,
            long itemsConsumed,
            long itemsWasted,
            double wasteRate
    ) {}
}