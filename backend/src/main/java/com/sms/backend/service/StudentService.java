package com.sms.backend.service;

import com.sms.backend.model.Student;
import com.sms.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepo;
    private final StudentCodeService codeService;

    public Student create(Student student) {
        if (studentRepo.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        student.setStudentCode(codeService.nextStudentCode());
        student.setCreatedAt(Instant.now());
        student.setUpdatedAt(Instant.now());

        try {
            return studentRepo.save(student);
        } catch (DuplicateKeyException e) {
            throw new RuntimeException("Duplicate key (email or studentCode)");
        }
    }

    public List<Student> getAll() {
        return studentRepo.findAll();
    }

    public Student getById(String id) {
        return studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Student update(String id, Student updated) {
        Student existing = getById(id);

        // email change check
        if (!existing.getEmail().equals(updated.getEmail()) && studentRepo.existsByEmail(updated.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        existing.setFullName(updated.getFullName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setAddress(updated.getAddress());
        existing.setGrade(updated.getGrade());
        existing.setActive(updated.isActive());
        existing.setUpdatedAt(Instant.now());

        return studentRepo.save(existing);
    }

    public void delete(String id) {
        Student s = getById(id);
        studentRepo.delete(s);
    }
}