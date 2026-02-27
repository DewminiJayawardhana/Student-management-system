package com.sms.backend.repository;

import com.sms.backend.model.StudentUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface StudentUserRepository extends MongoRepository<StudentUser, String> {
    Optional<StudentUser> findByUsername(String username);
}