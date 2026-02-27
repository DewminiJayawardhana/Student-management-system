package com.sms.backend.DTO;

public class TeacherLoginRequest {

    private String username;
    private String password;

    public TeacherLoginRequest() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}