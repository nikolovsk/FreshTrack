package com.freshtrack.backend.service.impl;

import com.freshtrack.backend.dto.CategoryDto;
import com.freshtrack.backend.entity.Category;
import com.freshtrack.backend.exception.CategoryAlreadyExistsException;
import com.freshtrack.backend.exception.CategoryNotFoundException;
import com.freshtrack.backend.mapper.CategoryMapper;
import com.freshtrack.backend.repository.CategoryRepository;
import com.freshtrack.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        String name = categoryDto.name();

        categoryRepository.findByName(name)
                .ifPresent(c -> { throw new CategoryAlreadyExistsException(name); });

        Category category = categoryMapper.toEntity(categoryDto);
        Category saved = categoryRepository.save(category);

        return categoryMapper.toDto(saved);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toDto)
                .toList();
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        return categoryMapper.toDto(category);
    }

    @Override
    public CategoryDto updateCategory(Long id, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        String name = categoryDto.name();

        categoryRepository.findByName(name).ifPresent(c -> {
            if (!c.getId().equals(id)) {
                throw new CategoryAlreadyExistsException(name);
            }
        });

        category.setName(name);
        Category updated = categoryRepository.save(category);

        return categoryMapper.toDto(updated);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        categoryRepository.delete(category);
    }
}
