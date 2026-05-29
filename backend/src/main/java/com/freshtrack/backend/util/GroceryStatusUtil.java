package com.freshtrack.backend.util;

import com.freshtrack.backend.enums.GroceryStatus;

import java.time.LocalDate;

public class GroceryStatusUtil {

    public static GroceryStatus determineStatus(LocalDate expirationDate) {

        LocalDate today = LocalDate.now();

        if (expirationDate.isBefore(today)) {
            return GroceryStatus.EXPIRED;
        }

        if (expirationDate.isBefore(today.plusDays(3))) {
            return GroceryStatus.EXPIRING_SOON;
        }

        return GroceryStatus.FRESH;
    }
}
