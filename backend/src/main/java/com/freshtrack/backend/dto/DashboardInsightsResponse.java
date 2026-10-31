package com.freshtrack.backend.dto;

import java.util.List;

public record DashboardInsightsResponse(
        List<Insight> insights
) {
    public record Insight(
            String type,
            String title,
            String description,
            String value,
            String sentiment
    ) {}
}