import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import StaffPage from "./pages/admin/StaffPage";
import StaffGradePage from "./pages/admin/StaffGradePage";
import StaffTermPage from "./pages/admin/StaffTermPage";
import StudentListPage from "./pages/admin/StudentListPage";
import TeacherListPage from "./pages/admin/TeacherListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import GradeStudentsPage from "./pages/admin/GradeStudentsPage";
import RegisterTeacherPage from "./pages/teacher/RegisterTeacherPage";
import RegisterStudentPage from "./pages/student/RegisterStudentPage";

import StudentLoginPage from "./pages/student/StudentLoginPage";
import StudentAccountPage from "./pages/student/StudentAccountPage";
import StudentStaffViewPage from "./pages/student/StudentStaffViewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* ✅ Staff routes (NEW) */}
        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute>
              <StaffPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/staff/grade/:grade"
          element={
            <ProtectedRoute>
              <StaffGradePage />
            </ProtectedRoute>
          }
        />
       
<Route path="/register-teacher" element={<RegisterTeacherPage />} />
        {/* Students */}
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute>
              <StudentListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students/grade/:grade"
          element={
            <ProtectedRoute>
              <GradeStudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/staff/grade/:grade/:term"
  element={
    <ProtectedRoute>
      <StaffTermPage />
    </ProtectedRoute>
  }
/>
<Route path="/student-login" element={<StudentLoginPage />} />

<Route
  path="/student/account"
  element={
    <ProtectedRoute allowRoles={["STUDENT"]}>
      <StudentAccountPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/staff/grade/:grade/term/:term"
  element={
    <ProtectedRoute allowRoles={["STUDENT"]}>
      <StudentStaffViewPage />
    </ProtectedRoute>
  }
/>
<Route path="/register-student" element={<RegisterStudentPage />} />

        {/* Teachers */}
        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute>
              <TeacherListPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}