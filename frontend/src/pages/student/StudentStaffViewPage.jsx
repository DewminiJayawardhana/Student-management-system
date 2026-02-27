import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/axios";

export default function StudentStaffViewPage() {
  const navigate = useNavigate();
  const { grade, term } = useParams();

  const classLetter = useMemo(() => (String(term).split("-")[0] || "").toUpperCase(), [term]);

  const [me, setMe] = useState(null);
  const [columns, setColumns] = useState([]);
  const [marks, setMarks] = useState({});
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setErr("");

      const res = await api.get(
        `/api/student-view/mark-sheet?grade=${grade}&classRoom=${classLetter}&term=${term}`
      );

      setMe(res.data.student);
      setColumns(res.data.columns || []);
      setMarks(res.data.marks || {});
    } catch (e) {
      setErr(e?.response?.data?.message || "Cannot load. Access denied or backend issue.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [grade, term]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <button
              onClick={() => navigate("/student/account")}
              className="mb-3 px-4 py-2 rounded-xl border bg-white hover:bg-gray-100"
            >
              ⬅ Back
            </button>

            <h2 className="text-2xl font-bold text-gray-800">
              Grade {grade} — {term}
            </h2>

            {me && (
              <p className="text-gray-600 mt-1">
                Viewing only your data: <b>{me.username}</b>
              </p>
            )}
          </div>

          <button
            onClick={load}
            className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-100"
          >
            Refresh
          </button>
        </div>

        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        {loading && <p className="mt-3 text-sm text-gray-500">Loading...</p>}

        <div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
          <div className="p-4 border-b">
            <p className="font-semibold text-gray-800">My Marks (Read-only)</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Marks</th>
                </tr>
              </thead>
              <tbody>
                {columns.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="p-4 text-gray-500">
                      No subjects/columns added yet.
                    </td>
                  </tr>
                ) : (
                  columns.map((c) => (
                    <tr key={c.key} className="border-t">
                      <td className="p-3">{c.name}</td>
                      <td className="p-3">{marks?.[c.key] ?? "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          You cannot edit anything. Only teachers can update marks.
        </p>
      </div>
    </div>
  );
}