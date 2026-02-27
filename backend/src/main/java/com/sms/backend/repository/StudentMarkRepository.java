package com.sms.backend.repository;

import com.sms.backend.model.StudentMark;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentMarkRepository extends MongoRepository<StudentMark, String> {
    List<StudentMark> findByGradeAndClassRoomAndTermAndSubject(Integer grade, String classRoom, String term, String subject);
    Optional<StudentMark> findByStudentIdAndTermAndSubject(String studentId, String term, String subject);
}
