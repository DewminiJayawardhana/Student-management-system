import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiBook, FiLock } from "react-icons/fi";
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
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      setLoading(true);
      await api.post("/api/teacher-auth/register", form);
      navigate("/login", {
        state: { flash: "Teacher registration successful. Please login." },
      });
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl">
            👩‍🏫
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-3">
            Teacher Registration
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Username must be approved by admin
          </p>
        </div>

        {err && <p className="text-red-600 text-sm text-center mb-3">{err}</p>}

        <form onSubmit={submit} className="space-y-4">
          {[
            { key: "username", icon: <FiUser />, placeholder: "Teacher Username" },
            { key: "name", icon: <FiUser />, placeholder: "Full Name" },
            { key: "subject", icon: <FiBook />, placeholder: "Subject" },
            { key: "email", icon: <FiMail />, placeholder: "Email" },
            { key: "password", icon: <FiLock />, placeholder: "Password", type: "password" },
          ].map((f) => (
            <div key={f.key} className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                {f.icon}
              </span>
              <input
                type={f.type || "text"}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) =>
                  setForm({ ...form, [f.key]: e.target.value })
                }
                className="w-full pl-11 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          ))}

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register as Teacher"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full border py-2 rounded-xl hover:bg-gray-50"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}