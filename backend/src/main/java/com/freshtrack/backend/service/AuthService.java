package com.freshtrack.backend.service;

import com.freshtrack.backend.dto.auth.AuthResponse;
import com.freshtrack.backend.dto.auth.LoginRequest;
import com.freshtrack.backend.dto.auth.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
