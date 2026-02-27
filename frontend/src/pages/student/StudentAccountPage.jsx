import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";

const TERMS = {
  A: ["A-I", "A-II", "A-III"],
  B: ["B-I", "B-II", "B-III"],
  C: ["C-I", "C-II", "C-III"],
};

export default function StudentAccountPage() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const grades = useMemo(() => Array.from({ length: 13 }, (_, i) => i + 1), []);
  const [activeGrade, setActiveGrade] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await api.get("/api/student-account/me");
        setMe(res.data);
        setActiveGrade(res.data.grade); // ✅ default to own grade
      } catch (e) {
        setErr("Cannot load account. Please login again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const isMyGrade = (g) => me && Number(me.grade) === Number(g);

  const openTerm = (g, term) => {
    if (!isMyGrade(g)) return;
    navigate(`/student/staff/grade/${g}/term/${term}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Account</h2>
            {loading && <p className="text-gray-500 text-sm mt-1">Loading...</p>}
            {err && <p className="text-red-600 text-sm mt-2">{err}</p>}

            {me && (
              <div className="mt-3 text-gray-700">
                <p>
                  <b>Full Name:</b> {me.name}
                </p>
                <p>
                  <b>Username:</b> {me.username}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Grade Tabs */}
        <div className="mt-6 bg-white rounded-2xl shadow p-4">
          <p className="font-semibold text-gray-800 mb-3">Grades</p>
          <div className="flex flex-wrap gap-2">
            {grades.map((g) => {
              const enabled = isMyGrade(g);
              return (
                <button
                  key={g}
                  onClick={() => enabled && setActiveGrade(g)}
                  className={`px-4 py-2 rounded-xl border text-sm font-semibold
                    ${activeGrade === g ? "bg-black text-white" : "bg-white"}
                    ${enabled ? "hover:bg-gray-100" : "opacity-40 cursor-not-allowed"}`}
                  title={enabled ? "" : "You can only access your own grade"}
                >
                  Grade {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* Term Buttons */}
        <div className="mt-6 bg-white rounded-2xl shadow p-5">
          <h3 className="text-lg font-bold text-gray-800">Grade {activeGrade} Terms</h3>
          <p className="text-gray-500 text-sm mt-1">
            Select your class-term to view your marks (read-only)
          </p>

          {!isMyGrade(activeGrade) ? (
            <p className="mt-4 text-sm text-red-600">You cannot open other grades.</p>
          ) : (
            <div className="mt-4">
              {(() => {
                const room = (me?.classRoom || "").toUpperCase(); // A/B/C
                const items = TERMS[room] || [];

                if (!room || items.length === 0) {
                  return (
                    <p className="text-sm text-red-600">
                      Your class room is not set. Contact admin.
                    </p>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-2xl p-4 bg-gray-50">
                      <p className="font-semibold text-gray-800 mb-3">Group {room}</p>

                      <div className="grid grid-cols-1 gap-2">
                        {items.map((term) => (
                          <button
                            key={term}
                            onClick={() => openTerm(activeGrade, term)}
                            className="py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}