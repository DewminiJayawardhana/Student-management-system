package com.sms.backend.repository;

import com.sms.backend.model.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TeacherRepository extends MongoRepository<Teacher, String> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    // ✅ add this (needed for registration validation)
    Optional<Teacher> findByUsername(String username);
}