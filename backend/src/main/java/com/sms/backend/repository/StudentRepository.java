package com.sms.backend.repository;

import com.sms.backend.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> findByGradeOrderByNameAsc(Integer grade); // ✅ safer
    boolean existsByUsername(String username);

    // ✅ NEW (needed for registration validation)
    Optional<Student> findByUsername(String username);
   
}