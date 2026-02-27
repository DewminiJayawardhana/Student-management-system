package com.sms.backend.repository;

import com.sms.backend.model.TeacherUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TeacherUserRepository extends MongoRepository<TeacherUser, String> {
    Optional<TeacherUser> findByUsername(String username);
}