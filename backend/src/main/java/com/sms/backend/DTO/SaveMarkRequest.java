package com.sms.backend.DTO;

public class SaveMarkRequest {
    private String studentId;
    private Integer grade;
    private String classRoom;
    private String term;
    private String subject;
    private Integer marks;
    private String teacherUsername;

    public SaveMarkRequest() {}

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