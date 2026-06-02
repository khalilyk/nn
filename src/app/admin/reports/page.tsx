"use client";

import { useState } from "react";

const reports = [
  { id: "RPT-048", client: "Kinoya", type: "Monthly Performance", period: "May 2025", status: "Delivered", date: "31 May 2025" },
  { id: "RPT-047", client: "Tony's Woodfire", type: "Monthly Performance", period: "May 2025", status: "Draft", date: "—" },
  { id: "RPT-046", client: "Maison Dali", type: "Campaign Report", period: "Apr 2025", status: "Delivered", date: "30 Apr 2025" },
  { id: "RPT-045", client: "PieHaus", type: "Social Media", period: "Apr 2025", status: "Delivered", date: "28 Apr 2025" },
  { id: "RPT-044", client: "Revolver", type: "Brand Launch", period: "Mar 2025", status: "Delivered", date: "31 Mar 2025" },
];

const statusColor: Record<string, string> = {
  Delivered: "text-[#D4FF38] bg-[#D4FF38]/8",
  Draft: "text-white/40 bg-white/5",
  Published: "text-blue-400 bg-blue-400/10",
};

const clients = ["Kinoya", "Tony's Woodfire", "Maison Dali", "PieHaus", "Revolver", "3Fils"];
const reportTypes = ["Monthly Performance", "Campaign Report", "Social Media", "Brand Launch", "Quarterly Review"];

export default function ReportsPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client: "", type: "", period: "", notes: "" });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white tracking-wide">REPORTS</h1>
          <p className="text-white/30 text-xs tracking-widest uppercase mt-1">Client reporting system</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="border border-[#D4FF38] text-[#D4FF38] px-4 py-2 text-[9px] tracking-[0.2em] uppercase hover:bg-[#D4FF38] hover:text-[#080808] transition-colors"
        >
          + Create Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Reports", value: "48" },
          { label: "This Month", value: "4" },
          { label: "Pending Delivery", value: "2" },
        ].map((s) => (
          <div key={s.label} className="bg-[#141414] border border-white/5 p-6">
            <div className="font-display text-3xl text-white mb-1">{s.value}</div>
            <div className="text-[9px] tracking-widest uppercase text-white/30">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-white/5">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              {["#", "Client", "Report Type", "Period", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[9px] tracking-widest uppercase text-white/25 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={r.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i === reports.length - 1 ? "border-b-0" : ""}`}>
                <td className="px-5 py-4 text-white/30 font-mono text-[10px]">{r.id}</td>
                <td className="px-5 py-4 text-white/80">{r.client}</td>
                <td className="px-5 py-4 text-white/50">{r.type}</td>
                <td className="px-5 py-4 text-white/50">{r.period}</td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-1 text-[9px] tracking-widest uppercase ${statusColor[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-white/30">{r.date}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    {["View", "PDF", "Send"].map((a) => (
                      <button key={a} className="text-[9px] tracking-widest uppercase text-white/30 hover:text-[#D4FF38] transition-colors">
                        {a}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Report Form */}
      {showForm && (
        <div className="bg-[#141414] border border-white/5 p-8">
          <h2 className="font-display text-xl text-white mb-6 tracking-wide">NEW REPORT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Client</label>
              <select
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                className="w-full bg-[#0d0d0d] border border-white/10 text-white/70 text-xs px-3 py-2 outline-none"
              >
                <option value="">Select client...</option>
                {clients.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Report Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-[#0d0d0d] border border-white/10 text-white/70 text-xs px-3 py-2 outline-none"
              >
                <option value="">Select type...</option>
                {reportTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Period</label>
              <input
                type="text"
                placeholder="e.g. May 2025"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                className="w-full bg-[#0d0d0d] border border-white/10 text-white/70 text-xs px-3 py-2 outline-none placeholder-white/20"
              />
            </div>
            <div>
              <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Upload Data</label>
              <button className="w-full border border-white/10 text-white/30 text-[9px] tracking-widest uppercase px-3 py-2 hover:border-white/20 hover:text-white/50 transition-colors text-left">
                Choose File →
              </button>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Notes</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-[#0d0d0d] border border-white/10 text-white/70 text-xs px-3 py-2 outline-none resize-none placeholder-white/20"
                placeholder="Internal notes..."
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="border border-white/15 text-white/40 px-4 py-2 text-[9px] tracking-[0.2em] uppercase hover:text-white/70 transition-colors">
              Save Draft
            </button>
            <button className="border border-[#D4FF38] text-[#D4FF38] px-4 py-2 text-[9px] tracking-[0.2em] uppercase hover:bg-[#D4FF38] hover:text-[#080808] transition-colors">
              Publish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
