package com.sms.backend.service;

import com.sms.backend.model.Counter;
import com.sms.backend.repository.CounterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Year;

@Service
@RequiredArgsConstructor
public class StudentCodeService {

    private final CounterRepository counterRepo;

    public synchronized String nextStudentCode() {
        Counter counter = counterRepo.findById("student")
                .orElse(Counter.builder().id("student").seq(0).build());

        long next = counter.getSeq() + 1;
        counter.setSeq(next);
        counterRepo.save(counter);

        int year = Year.now().getValue();
        return String.format("STU-%d-%04d", year, next);
    }
}