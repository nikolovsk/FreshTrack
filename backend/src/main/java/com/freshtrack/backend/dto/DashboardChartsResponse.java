package com.freshtrack.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public record DashboardChartsResponse(
        List<MonthlySpending> spendingOverTime,
        long itemsConsumed,
        long itemsWasted
) {
    public record MonthlySpending(
            String month,
            BigDecimal totalSpending,
            BigDecimal wastedSpending
    ) {}
}