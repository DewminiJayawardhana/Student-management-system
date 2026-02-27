package com.sms.backend.repository;

import com.sms.backend.model.MarkSheet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MarkSheetRepository extends MongoRepository<MarkSheet, String> {
    Optional<MarkSheet> findByGradeAndClassRoomAndTerm(Integer grade, String classRoom, String term);
}
