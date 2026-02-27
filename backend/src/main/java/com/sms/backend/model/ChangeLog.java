package com.sms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "change_logs")
public class ChangeLog {

    @Id
    private String id;

    private Instant createdAt = Instant.now();

    private String actorUsername; // "ADMIN" or teacher username
    private String actorRole;     // "ADMIN" or "TEACHER"

    private String entityType;    // "MARK_SHEET"
    private String entityKey;     // example: "G2-A-A-I"

    private String action;        // "ADD_COLUMN" | "DELETE_COLUMN" | "UPDATE_MARK"
    private String message;       // readable summary

    public ChangeLog() {}

    public ChangeLog(String actorUsername, String actorRole,
                     String entityType, String entityKey,
                     String action, String message) {
        this.actorUsername = actorUsername;
        this.actorRole = actorRole;
        this.entityType = entityType;
        this.entityKey = entityKey;
        this.action = action;
        this.message = message;
        this.createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public String getActorUsername() { return actorUsername; }
    public void setActorUsername(String actorUsername) { this.actorUsername = actorUsername; }

    public String getActorRole() { return actorRole; }
    public void setActorRole(String actorRole) { this.actorRole = actorRole; }

    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }

    public String getEntityKey() { return entityKey; }
    public void setEntityKey(String entityKey) { this.entityKey = entityKey; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}