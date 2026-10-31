package com.freshtrack.backend.service;

import com.freshtrack.backend.dto.DashboardChartsResponse;
import com.freshtrack.backend.dto.DashboardSummaryResponse;
import java.time.LocalDate;

public interface DashboardService {

    DashboardSummaryResponse getDashboardSummary(LocalDate startDate, LocalDate endDate);

    DashboardChartsResponse getDashboardCharts(LocalDate startDate, LocalDate endDate);
}