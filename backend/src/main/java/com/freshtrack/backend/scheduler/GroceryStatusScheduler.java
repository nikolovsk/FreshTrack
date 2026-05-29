package com.freshtrack.backend.scheduler;

import com.freshtrack.backend.entity.GroceryItem;
import com.freshtrack.backend.repository.GroceryItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.freshtrack.backend.util.GroceryStatusUtil.determineStatus;

@Service
@RequiredArgsConstructor
@Transactional
public class GroceryStatusScheduler {

    private final GroceryItemRepository groceryItemRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void updateStatus() {

        List<GroceryItem> groceryItems = groceryItemRepository.findAll();

        for (GroceryItem item : groceryItems) {
            item.setStatus(determineStatus(item.getExpirationDate()));
        }
    }
}
