package com.freshtrack.backend.service;

import com.freshtrack.backend.dto.DashboardSummaryResponse;
import java.time.LocalDate;

public interface DashboardService {

    DashboardSummaryResponse getDashboardSummary(LocalDate startDate, LocalDate endDate);
}