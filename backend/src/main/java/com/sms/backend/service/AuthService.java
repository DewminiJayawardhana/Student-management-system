package com.sms.backend.service;

import com.sms.backend.config.JwtService;
import com.sms.backend.dto.AuthResponse;
import com.sms.backend.dto.LoginRequest;
import com.sms.backend.dto.RegisterRequest;
import com.sms.backend.model.Role;
import com.sms.backend.model.User;
import com.sms.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder encoder;
    private final JwtService jwt;

    public void register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Role role = (req.getRole() == null) ? Role.STUDENT : req.getRole();

        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(encoder.encode(req.getPassword()))
                .role(role)
                .build();

        userRepo.save(user);
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwt.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getRole().name(), user.getName(), user.getEmail());
    }
}