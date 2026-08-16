package com.freshtrack.backend.service;

import com.freshtrack.backend.dto.DetectedGroceryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GroceryRecognitionService {

    List<DetectedGroceryResponse> detectGroceries(MultipartFile image);
}