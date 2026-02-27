import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";

export default function StudentLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // ✅ NEW
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      setLoading(true);

      // ✅ send username + password
      const res = await api.post("/api/student-auth/login", {
        username: username.trim(),
        password: password.trim(),
      });

      localStorage.setItem("studentLoggedIn", "true");
      localStorage.setItem("role", "STUDENT");
      localStorage.setItem("studentId", res.data.id);
      localStorage.setItem("studentUsername", res.data.username);

      navigate("/student/account");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Student Login
        </h2>

        {err && <p className="text-red-600 text-sm text-center mt-3">{err}</p>}

        <form onSubmit={submit} className="mt-6 space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-xl"
              placeholder="STU00021"
              required
            />
          </div>

          {/* ✅ Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-xl"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}