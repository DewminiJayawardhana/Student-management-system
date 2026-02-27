package com.sms.backend.controller;

import com.sms.backend.model.MarkSheet;
import com.sms.backend.model.Student;
import com.sms.backend.repository.MarkSheetRepository;
import com.sms.backend.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/student-view")
@CrossOrigin
public class StudentViewController {

    private final MarkSheetRepository sheetRepo;
    private final StudentRepository studentRepo;

    public StudentViewController(MarkSheetRepository sheetRepo,
                                 StudentRepository studentRepo) {
        this.sheetRepo = sheetRepo;
        this.studentRepo = studentRepo;
    }

    @GetMapping("/mark-sheet")
    public Map<String, Object> viewMarkSheet(
            @RequestHeader("X-Student-Id") String studentId,
            @RequestParam Integer grade,
            @RequestParam String classRoom,
            @RequestParam String term
    ) {
        if (studentId == null || studentId.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing session");
        }

        Student student = studentRepo.findById(studentId.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Student not found"));

        int reqGrade = (grade == null) ? -1 : grade;

        // ✅ SECURITY CHECK: student can only view their own grade & class
        if (student.getGrade() != reqGrade ||
                !student.getClassRoom().equalsIgnoreCase(classRoom.trim())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }

        MarkSheet sheet = sheetRepo
                .findByGradeAndClassRoomAndTerm(
                        reqGrade,
                        classRoom.trim().toUpperCase(),
                        term.trim()
                )
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mark sheet not found"));

        Map<String, Integer> studentMarks =
                sheet.getMarks().getOrDefault(studentId.trim(), Map.of());

        return Map.of(
                "student", Map.of(
                        "id", student.getId(),
                        "name", student.getName(),
                        "username", student.getUsername(),
                        "grade", student.getGrade(),
                        "classRoom", student.getClassRoom()
                ),
                "columns", sheet.getColumns(),
                "marks", studentMarks
        );
    }
}