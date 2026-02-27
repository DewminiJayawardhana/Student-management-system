package com.sms.backend.repository;

import com.sms.backend.model.ChangeLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChangeLogRepository extends MongoRepository<ChangeLog, String> {
    List<ChangeLog> findByEntityTypeAndEntityKeyOrderByCreatedAtDesc(String entityType, String entityKey);
}