package com.sms.backend.controller;

import com.sms.backend.DTO.AddColumnRequest;
import com.sms.backend.DTO.UpdateMarkRequest;
import com.sms.backend.model.ChangeLog;
import com.sms.backend.model.MarkSheet;
import com.sms.backend.repository.ChangeLogRepository;
import com.sms.backend.repository.MarkSheetRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/mark-sheets")
@CrossOrigin
public class MarkSheetController {

    private final MarkSheetRepository repo;
    private final ChangeLogRepository historyRepo;

    public MarkSheetController(MarkSheetRepository repo, ChangeLogRepository historyRepo) {
        this.repo = repo;
        this.historyRepo = historyRepo;
    }

    private String sheetKey(Integer grade, String classRoom, String term) {
        return "G" + grade + "-" + classRoom + "-" + term; // ✅ G2-A-A-I
    }

    @GetMapping
    public MarkSheet getSheet(
            @RequestParam Integer grade,
            @RequestParam String classRoom,
            @RequestParam String term
    ) {
        String c = classRoom.trim().toUpperCase();
        String t = term.trim();

        return repo.findByGradeAndClassRoomAndTerm(grade, c, t)
                .orElseGet(() -> {
                    MarkSheet sheet = new MarkSheet();
                    sheet.setGrade(grade);
                    sheet.setClassRoom(c);
                    sheet.setTerm(t);
                    return repo.save(sheet);
                });
    }

    @PostMapping("/columns")
    public Map<String, Object> addColumn(
            @RequestParam Integer grade,
            @RequestParam String classRoom,
            @RequestParam String term,
            @RequestBody AddColumnRequest req
    ) {
        if (req.getName() == null || req.getName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Column name required");
        }

        String c = classRoom.trim().toUpperCase();
        String t = term.trim();
        String updatedBy = (req.getUpdatedBy() == null || req.getUpdatedBy().trim().isEmpty())
                ? "UNKNOWN"
                : req.getUpdatedBy().trim();

        MarkSheet sheet = getSheet(grade, c, t);

        String newName = req.getName().trim();
        boolean exists = sheet.getColumns().stream()
                .anyMatch(col -> col.getName() != null && col.getName().equalsIgnoreCase(newName));
        if (exists) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Column already exists");
        }

        String key = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
        sheet.getColumns().add(new MarkSheet.MarkColumn(key, newName));
        sheet.setLastUpdatedBy(updatedBy);
        repo.save(sheet);

        // ✅ SAVE HISTORY
        historyRepo.save(new ChangeLog(
                updatedBy,
                updatedBy.equalsIgnoreCase("ADMIN") ? "ADMIN" : "TEACHER",
                "MARK_SHEET",
                sheetKey(grade, c, t),
                "ADD_COLUMN",
                "Added column: " + newName
        ));

        return Map.of("message", "Column added", "key", key);
    }

    @DeleteMapping("/columns/{columnKey}")
    public Map<String, Object> deleteColumn(
            @RequestParam Integer grade,
            @RequestParam String classRoom,
            @RequestParam String term,
            @RequestParam(required = false) String updatedBy,
            @PathVariable String columnKey
    ) {
        String c = classRoom.trim().toUpperCase();
        String t = term.trim();
        String actor = (updatedBy == null || updatedBy.trim().isEmpty()) ? "UNKNOWN" : updatedBy.trim();

        MarkSheet sheet = getSheet(grade, c, t);

        String removedName = sheet.getColumns().stream()
                .filter(col -> col.getKey().equals(columnKey))
                .map(MarkSheet.MarkColumn::getName)
                .findFirst()
                .orElse(columnKey);

        sheet.getColumns().removeIf(col -> col.getKey().equals(columnKey));
        sheet.getMarks().values().forEach(row -> row.remove(columnKey));

        sheet.setLastUpdatedBy(actor);
        repo.save(sheet);

        // ✅ SAVE HISTORY
        historyRepo.save(new ChangeLog(
                actor,
                actor.equalsIgnoreCase("ADMIN") ? "ADMIN" : "TEACHER",
                "MARK_SHEET",
                sheetKey(grade, c, t),
                "DELETE_COLUMN",
                "Removed column: " + removedName
        ));

        return Map.of("message", "Column removed");
    }

    @PutMapping("/mark")
    public Map<String, Object> updateMark(
            @RequestParam Integer grade,
            @RequestParam String classRoom,
            @RequestParam String term,
            @RequestBody UpdateMarkRequest req
    ) {
        if (req.getStudentId() == null || req.getColumnKey() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "studentId and columnKey required");
        }
        if (req.getValue() == null || req.getValue() < 0 || req.getValue() > 100) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Marks must be 0-100");
        }

        String c = classRoom.trim().toUpperCase();
        String t = term.trim();
        String updatedBy = (req.getUpdatedBy() == null || req.getUpdatedBy().trim().isEmpty())
                ? "UNKNOWN"
                : req.getUpdatedBy().trim();

        MarkSheet sheet = getSheet(grade, c, t);

        sheet.getMarks().putIfAbsent(req.getStudentId().trim(), new java.util.HashMap<>());
        sheet.getMarks().get(req.getStudentId().trim()).put(req.getColumnKey().trim(), req.getValue());

        sheet.setLastUpdatedBy(updatedBy);
        repo.save(sheet);

        // ✅ SAVE HISTORY
        historyRepo.save(new ChangeLog(
                updatedBy,
                updatedBy.equalsIgnoreCase("ADMIN") ? "ADMIN" : "TEACHER",
                "MARK_SHEET",
                sheetKey(grade, c, t),
                "UPDATE_MARK",
                "Updated marks: studentId=" + req.getStudentId() +
                        " column=" + req.getColumnKey() +
                        " value=" + req.getValue()
        ));

        return Map.of("message", "Saved");
    }
}