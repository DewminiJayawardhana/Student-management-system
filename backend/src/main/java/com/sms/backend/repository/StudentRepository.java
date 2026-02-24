package com.sms.backend.repository;

import com.sms.backend.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {
    boolean existsByEmail(String email);
    Optional<Student> findByStudentCode(String studentCode);
}