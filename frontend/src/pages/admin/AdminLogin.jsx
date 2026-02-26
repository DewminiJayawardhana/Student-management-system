import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";
import { api } from "../../api/axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const flash = location.state?.flash;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // ===== ADMIN LOGIN =====
    if (username === "admin@ssms.com" && password === "admin@123") {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("role", "ADMIN");
      localStorage.removeItem("teacherLoggedIn");
      navigate("/admin");
      return;
    }

    // ===== TEACHER LOGIN =====
    try {
      await api.post("/api/teacher-auth/login", { username, password });
      localStorage.setItem("teacherLoggedIn", "true");
      localStorage.setItem("role", "TEACHER");
      localStorage.setItem("teacherUsername", username);
      localStorage.removeItem("adminLoggedIn");
      navigate("/admin/staff");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        {/* ===== Title ===== */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            School Login
          </h2>
          <p className="text-gray-500 mt-1">
            Admin & Teacher access
          </p>
        </div>

        {/* Flash message */}
        {flash && (
          <p className="text-green-600 text-sm text-center mb-3">
            {flash}
          </p>
        )}

        {/* ===== Form ===== */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@ssms.com or teacher username"
                className="w-full pl-11 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            <FiLogIn />
            Login
          </button>
        </form>

        {/* ===== Footer ===== */}
        <div className="mt-6 text-center">
          <Link
            to="/register-teacher"
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Register as Teacher
          </Link>
        </div>

      </div>
    </div>
  );
}