// src/pages/teacher/RegisterTeacherPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";

export default function RegisterTeacherPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    subject: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    const payload = {
      username: form.username.trim(),
      name: form.name.trim(),
      subject: form.subject.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    if (!payload.username || !payload.name || !payload.subject || !payload.email || !payload.password) {
      setErr("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/teacher-auth/register", payload);

      // show success then redirect to login with flash message
      setMsg("Registration successful. Please login.");
      setTimeout(() => {
        navigate("/login", { state: { flash: "Registration successful. Please login." } });
      }, 700);
    } catch (e2) {
      const m = e2?.response?.data?.message || e2?.response?.data || "Registration failed.";
      setErr(String(m));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800">Teacher Registration</h2>
        <p className="text-gray-600 mt-1 text-sm">
          Your username must be pre-approved by admin.
        </p>

        {err && <p className="text-red-600 text-sm mt-3">{err}</p>}
        {msg && <p className="text-green-700 text-sm mt-3">{msg}</p>}

        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Username (must match admin list)"
            value={form.username}
            onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
          />

          <input
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />

          <input
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
          />

          <input
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />

          <input
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          />

          <button
            disabled={loading}
            className="w-full px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full px-4 py-2 rounded-xl border bg-white hover:bg-gray-100"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}