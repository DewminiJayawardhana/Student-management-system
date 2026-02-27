import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081",
});

api.interceptors.request.use((config) => {
  const studentId = localStorage.getItem("studentId");
  if (studentId) {
    config.headers["X-Student-Id"] = studentId;
  }
  return config;
});