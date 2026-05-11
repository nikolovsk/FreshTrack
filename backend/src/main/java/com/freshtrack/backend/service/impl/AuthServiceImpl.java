package com.freshtrack.backend.service.impl;

import com.freshtrack.backend.dto.auth.AuthResponse;
import com.freshtrack.backend.dto.auth.LoginRequest;
import com.freshtrack.backend.dto.auth.RegisterRequest;
import com.freshtrack.backend.entity.User;
import com.freshtrack.backend.exception.EmailAlreadyExistsException;
import com.freshtrack.backend.repository.UserRepository;
import com.freshtrack.backend.security.JwtService;
import com.freshtrack.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {

        String email = request.email();

        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException(email);
        }

        User user = User.builder()
                .name(request.name())
                .email(email)
                .password(passwordEncoder.encode(request.password()))
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(email);

        return new AuthResponse(token);
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        String token = jwtService.generateToken(request.email());

        return new AuthResponse(token);
    }
}
