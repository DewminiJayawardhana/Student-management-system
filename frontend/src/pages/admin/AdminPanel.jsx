import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiLogOut,
} from "react-icons/fi";

export default function AdminPanel() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // ADMIN or TEACHER

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("teacherLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("teacherUsername");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-xl mx-auto">

        {/* ===== Header ===== */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {role === "TEACHER" ? "Teacher Panel" : "Admin Panel"}
            </h2>
            <p className="text-gray-600 mt-1">Welcome back 👋</p>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>

        {/* ===== Vertical Buttons ===== */}
        <div className="space-y-4">

          {/* Students */}
          {role !== "TEACHER" && (
            <button
              onClick={() => navigate("/admin/students")}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-white shadow hover:shadow-lg transition text-left"
            >
              <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
                <FiUsers size={22} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Students</h3>
                <p className="text-sm text-gray-600">
                  Manage students & classes
                </p>
              </div>
            </button>
          )}

          {/* Teachers */}
          {role !== "TEACHER" && (
            <button
              onClick={() => navigate("/admin/teachers")}
              className="w-full flex items-center gap-4 p-5 rounded-2xl bg-white shadow hover:shadow-lg transition text-left"
            >
              <div className="p-3 rounded-xl bg-green-100 text-green-700">
                <FiUserCheck size={22} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Teachers</h3>
                <p className="text-sm text-gray-600">
                  Approve & manage teachers
                </p>
              </div>
            </button>
          )}

          {/* Staff */}
          <button
            onClick={() => navigate("/admin/staff")}
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl transition text-left"
          >
            <div className="p-3 rounded-xl bg-white/20">
              <FiBookOpen size={22} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Staff</h3>
              <p className="text-sm text-white/90">
                Marks, terms & assessments
              </p>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}