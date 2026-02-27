package com.sms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document(collection = "mark_sheets")
@CompoundIndex(
        name = "uniq_sheet_global",
        def = "{'grade':1,'classRoom':1,'term':1}",
        unique = true
)
public class MarkSheet {

    @Id
    private String id;

    private Integer grade;
    private String classRoom;   // A/B/C
    private String term;        // A-I, B-II, etc.

    // ✅ teacher/admin can create any columns (shared)
    private List<MarkColumn> columns = new ArrayList<>();

    // ✅ marks[studentId][columnKey] = value
    private Map<String, Map<String, Integer>> marks = new HashMap<>();

    // optional: who updated last (for history)
    private String lastUpdatedBy;

    public MarkSheet() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Integer getGrade() { return grade; }
    public void setGrade(Integer grade) { this.grade = grade; }

    public String getClassRoom() { return classRoom; }
    public void setClassRoom(String classRoom) { this.classRoom = classRoom; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public List<MarkColumn> getColumns() { return columns; }
    public void setColumns(List<MarkColumn> columns) { this.columns = columns; }

    public Map<String, Map<String, Integer>> getMarks() { return marks; }
    public void setMarks(Map<String, Map<String, Integer>> marks) { this.marks = marks; }

    public String getLastUpdatedBy() { return lastUpdatedBy; }
    public void setLastUpdatedBy(String lastUpdatedBy) { this.lastUpdatedBy = lastUpdatedBy; }

    // ===== Column =====
    public static class MarkColumn {
        private String key;   // unique id
        private String name;  // teacher typed

        public MarkColumn() {}
        public MarkColumn(String key, String name) {
            this.key = key;
            this.name = name;
        }

        public String getKey() { return key; }
        public void setKey(String key) { this.key = key; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }
}