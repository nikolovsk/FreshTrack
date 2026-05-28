package com.freshtrack.backend.repository;

import com.freshtrack.backend.entity.GroceryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroceryItemRepository extends
        JpaRepository<GroceryItem, Long>,
        JpaSpecificationExecutor<GroceryItem> {

    List<GroceryItem> findByUserId(Long userId);

    Optional<GroceryItem> findByIdAndUserId(Long id, Long userId);
}
