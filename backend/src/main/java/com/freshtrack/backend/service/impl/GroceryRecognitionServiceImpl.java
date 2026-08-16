package com.freshtrack.backend.service.impl;

import com.freshtrack.backend.dto.DetectedGroceryResponse;
import com.freshtrack.backend.service.GroceryRecognitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroceryRecognitionServiceImpl implements GroceryRecognitionService {

    @Override
    public List<DetectedGroceryResponse> detectGroceries(MultipartFile image) {
        return List.of();
    }
}