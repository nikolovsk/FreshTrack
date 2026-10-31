package com.freshtrack.backend.dto;

import java.math.BigDecimal;

public record DashboardSummaryResponse(
        long groceriesPurchased,
        BigDecimal totalSpending,
        long itemsConsumed,
        long itemsWasted,
        BigDecimal totalWastedSpending,
        long freshItems,
        long expiringSoonItems,
        long expiredItems
) {
}