package com.sms.backend.controller;

import com.sms.backend.dto.AuthResponse;
import com.sms.backend.dto.LoginRequest;
import com.sms.backend.dto.RegisterRequest;
import com.sms.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public Map<String, String> register(@Valid @RequestBody RegisterRequest req) {
        authService.register(req);
        return Map.of("message", "Registered successfully");
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }
}