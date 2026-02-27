import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLogIn, FiUserPlus, FiBookOpen } from "react-icons/fi";

export default function LoginSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">School Login</h2>
          <p className="text-gray-500 mt-1">Welcome!</p>
        </div>

        <div className="space-y-4">
          {/* Staff Login */}
          <button
            onClick={() => navigate("/staff-login")}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            <FiLogIn />
            Staff Login
          </button>

          {/* Student Login */}
          <button
            onClick={() => navigate("/student-login")}
            className="w-full flex items-center justify-center gap-2 border border-blue-500 text-blue-700 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Student Login
          </button>

          {/* Register Student */}
          <Link
            to="/register-student"
            className="w-full flex items-center justify-center gap-2 border border-green-500 text-green-700 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition"
          >
            <FiUserPlus />
            Register as Student
          </Link>

          {/* Register Teacher */}
          <Link
            to="/register-teacher"
            className="w-full flex items-center justify-center gap-2 border border-indigo-500 text-indigo-700 py-2.5 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            <FiBookOpen />
            Register as Teacher
          </Link>
        </div>
      </div>
    </div>
  );
}