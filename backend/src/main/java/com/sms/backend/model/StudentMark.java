package com.sms.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student_marks")
@CompoundIndex(name = "uniq_mark", def = "{'studentId':1,'term':1,'subject':1}", unique = true)
public class StudentMark {

    @Id
    private String id;

    private String studentId;
    private Integer grade;
    private String classRoom;   // A/B/C
    private String term;        // A-I, B-II, etc.
    private String subject;     // teacher subject
    private Integer marks;      // 0-100
    private String teacherUsername;

    public StudentMark() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public Integer getGrade() { return grade; }
    public void setGrade(Integer grade) { this.grade = grade; }

    public String getClassRoom() { return classRoom; }
    public void setClassRoom(String classRoom) { this.classRoom = classRoom; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public Integer getMarks() { return marks; }
    public void setMarks(Integer marks) { this.marks = marks; }

    public String getTeacherUsername() { return teacherUsername; }
    public void setTeacherUsername(String teacherUsername) { this.teacherUsername = teacherUsername; }
}