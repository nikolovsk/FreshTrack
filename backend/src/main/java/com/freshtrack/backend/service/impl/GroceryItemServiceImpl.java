package com.freshtrack.backend.service.impl;

import com.freshtrack.backend.dto.GroceryItemRequest;
import com.freshtrack.backend.dto.GroceryItemResponse;
import com.freshtrack.backend.entity.Category;
import com.freshtrack.backend.entity.GroceryItem;
import com.freshtrack.backend.entity.User;
import com.freshtrack.backend.enums.GroceryStatus;
import com.freshtrack.backend.exception.CategoryNotFoundException;
import com.freshtrack.backend.exception.GroceryItemAccessDeniedException;
import com.freshtrack.backend.exception.UserNotFoundException;
import com.freshtrack.backend.mapper.GroceryItemMapper;
import com.freshtrack.backend.repository.CategoryRepository;
import com.freshtrack.backend.repository.GroceryItemRepository;
import com.freshtrack.backend.repository.UserRepository;
import com.freshtrack.backend.service.GroceryItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroceryItemServiceImpl implements GroceryItemService {

    private final GroceryItemRepository groceryItemRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final GroceryItemMapper mapper;

    @Override
    public GroceryItemResponse createGroceryItem(GroceryItemRequest request) {

        Long userId = getLoggedInUserId();

        User user = userRepository.getReferenceById(userId);

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException(request.categoryId()));

        GroceryItem item = GroceryItem.builder()
                .name(request.name())
                .quantity(request.quantity())
                .price(request.price())
                .purchaseDate(request.purchaseDate())
                .expirationDate(request.expirationDate())
                .status(determineStatus(request.expirationDate()))
                .category(category)
                .user(user)
                .build();

        GroceryItem saved = groceryItemRepository.save(item);

        return mapper.toResponse(saved);
    }

    @Override
    public List<GroceryItemResponse> getUserGroceryItems() {

        Long userId = getLoggedInUserId();

        return groceryItemRepository.findByUserId(userId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public GroceryItemResponse getGroceryItemById(Long id) {

        GroceryItem item = getUserOwnedGroceryItem(id);

        return mapper.toResponse(item);
    }

    @Override
    public GroceryItemResponse updateGroceryItem(Long id, GroceryItemRequest request) {

        GroceryItem item = getUserOwnedGroceryItem(id);

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException(request.categoryId()));

        item.setName(request.name());
        item.setQuantity(request.quantity());
        item.setPrice(request.price());
        item.setPurchaseDate(request.purchaseDate());
        item.setExpirationDate(request.expirationDate());
        item.setCategory(category);
        item.setStatus(determineStatus(request.expirationDate()));

        GroceryItem updated = groceryItemRepository.save(item);

        return mapper.toResponse(updated);
    }

    @Override
    public void deleteGroceryItem(Long id) {

        GroceryItem item = getUserOwnedGroceryItem(id);

        groceryItemRepository.delete(item);
    }

    private Long getLoggedInUserId() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email))
                .getId();
    }

    private GroceryStatus determineStatus(LocalDate expirationDate) {

        LocalDate today = LocalDate.now();

        if (expirationDate.isBefore(today)) {
            return GroceryStatus.EXPIRED;
        }

        if (expirationDate.isBefore(today.plusDays(3))) {
            return GroceryStatus.EXPIRING_SOON;
        }

        return GroceryStatus.FRESH;
    }

    private GroceryItem getUserOwnedGroceryItem(Long id) {
        Long userId = getLoggedInUserId();

        return groceryItemRepository.findByIdAndUserId(id, userId)
                .orElseThrow(GroceryItemAccessDeniedException::new);
    }
}
