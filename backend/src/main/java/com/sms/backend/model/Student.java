package com.sms.backend.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    private String id;

    @Indexed(unique = true)
    private String studentCode; // STU-2026-0001

    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    @Indexed(unique = true)
    private String email;

    @NotBlank
    private String phone;

    private String address;

    @NotBlank
    private String grade;

    private boolean active = true;

    private Instant createdAt;
    private Instant updatedAt;
}