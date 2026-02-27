import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowRoles }) {
  const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  const teacherLoggedIn = localStorage.getItem("teacherLoggedIn") === "true";
  const studentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";

  const role = localStorage.getItem("role"); // ADMIN / TEACHER / STUDENT

  const isLoggedIn = adminLoggedIn || teacherLoggedIn || studentLoggedIn;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const currentRole =
    role || (adminLoggedIn ? "ADMIN" : teacherLoggedIn ? "TEACHER" : studentLoggedIn ? "STUDENT" : null);

  if (allowRoles && currentRole && !allowRoles.includes(currentRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
/*import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowRoles }) {
  // ✅ Support your old admin flag (keeps existing working)
  const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  // ✅ New teacher login support (we'll set these on teacher login)
  const role = localStorage.getItem("role"); // "ADMIN" or "TEACHER"
  const teacherLoggedIn = localStorage.getItem("teacherLoggedIn") === "true";

  const isLoggedIn = adminLoggedIn || teacherLoggedIn;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // if role not set but adminLoggedIn true -> treat as ADMIN (backward compatible)
  const currentRole = role || (adminLoggedIn ? "ADMIN" : null);

  if (allowRoles && currentRole && !allowRoles.includes(currentRole)) {
    // logged in but not allowed to view this page
    return <Navigate to="/login" replace />;
  }

  return children;
}*/