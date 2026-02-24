package com.sms.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    // ✅ must be 32+ chars for HS256
    private static final String SECRET = "CHANGE_THIS_TO_A_32_CHAR_SECRET_KEY!!";
    private static final long EXP_MS = 1000L * 60 * 60 * 24; // 24h

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXP_MS))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims parse(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getEmail(String token) {
        return parse(token).getSubject();
    }

    public String getRole(String token) {
        Object role = parse(token).get("role");
        return role == null ? null : role.toString();
    }
}
