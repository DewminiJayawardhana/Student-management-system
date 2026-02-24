package com.sms.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("counters")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Counter {
    @Id
    private String id;   // e.g. "student"
    private long seq;    // auto increment number
}
