import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import { api } from "../../api/axios";

export default function StaffPage() {
  const navigate = useNavigate();
  const grades = Array.from({ length: 13 }, (_, i) => i + 1);

  const teacherUsername = localStorage.getItem("teacherUsername") || "";
  const role = localStorage.getItem("role") || "";

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    username: teacherUsername,
    name: "",
    subject: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const loadProfile = async () => {
    setErr("");
    setMsg("");
    if (!teacherUsername) {
      setErr("Teacher username not found. Please login again.");
      return;
    }
    try {
      const res = await api.get(`/api/teacher-auth/me/${teacherUsername}`);
      setProfile((p) => ({
        ...p,
        username: res.data.username,
        name: res.data.name || "",
        subject: res.data.subject || "",
        email: res.data.email || "",
        password: "",
      }));
      setOpen(true);
    } catch (e) {
      setErr("Cannot load profile.");
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    setErr("");
    setMsg("");
    try {
      await api.put(`/api/teacher-auth/me/${teacherUsername}`, {
        name: profile.name,
        subject: profile.subject,
        email: profile.email,
        password: profile.password, // optional
      });
      setMsg("✅ Profile updated");
      setOpen(false);
    } catch (e) {
      const m = e?.response?.data?.message || e?.response?.data || "Update failed";
      setErr(String(m));
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("teacherLoggedIn");
    localStorage.removeItem("teacherUsername");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* ✅ TOP BAR (Account on right) */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border hover:bg-gray-100"
            title="Back to Admin Panel"
          >
            <FiArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white border flex items-center gap-2">
              <FiUser />
              <span className="text-sm text-gray-700">
                {role === "TEACHER" ? "Teacher" : "Admin"}:{" "}
                <b>{teacherUsername || "admin"}</b>
              </span>
            </div>

            {role === "TEACHER" && (
              <button
                type="button"
                onClick={loadProfile}
                className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
              >
                Edit My Account
              </button>
            )}

            {role === "TEACHER" && (
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-100"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Page title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Staff Page</h2>
          <p className="text-gray-600 mt-1">Select a grade to manage staff</p>
        </div>

        {/* Grade buttons */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => navigate(`/admin/staff/grade/${g}`)}
              className="py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Grade {g}
            </button>
          ))}
        </div>

        {/* ✅ Edit Account Modal */}
        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow p-6">
              <h3 className="text-xl font-bold text-gray-800">My Account</h3>

              {err && <p className="text-red-600 text-sm mt-2">{err}</p>}

              <div className="mt-4 space-y-3">
                {/* username - read only */}
                <input
                  value={profile.username}
                  disabled
                  className="w-full px-4 py-2 border rounded-xl bg-gray-100 text-gray-600"
                />

                <input
                  value={profile.name}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-xl"
                />

                <input
                  value={profile.subject}
                  onChange={(e) => setProfile((p) => ({ ...p, subject: e.target.value }))}
                  placeholder="Subject"
                  className="w-full px-4 py-2 border rounded-xl"
                />

                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-xl"
                />

                <input
                  type="password"
                  value={profile.password}
                  onChange={(e) => setProfile((p) => ({ ...p, password: e.target.value }))}
                  placeholder="New Password (optional)"
                  className="w-full px-4 py-2 border rounded-xl"
                />
              </div>

              <div className="mt-5 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={saveProfile}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {msg && <p className="mt-4 text-green-700 text-sm">{msg}</p>}
      </div>
    </div>
  );
}