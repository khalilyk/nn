"use client";

import { useState } from "react";

const history = [
  { id: "NTF-024", client: "Kinoya", type: "Report Ready", subject: "May 2025 Performance Report", sent: "31 May 2025", status: "Opened" },
  { id: "NTF-023", client: "PieHaus", type: "Invoice Reminder", subject: "Invoice #INV-031 Due Today", sent: "28 May 2025", status: "Sent" },
  { id: "NTF-022", client: "Maison Dali", type: "Proposal Follow-up", subject: "Campaign Proposal — Following Up", sent: "25 May 2025", status: "Opened" },
  { id: "NTF-021", client: "3Fils", type: "Project Update", subject: "Identity Deck v3 Ready for Review", sent: "20 May 2025", status: "Opened" },
  { id: "NTF-020", client: "Revolver", type: "Report Ready", subject: "Brand Launch Report — March", sent: "31 Mar 2025", status: "Pending" },
];

const statusColor: Record<string, string> = {
  Sent: "text-white/40 bg-white/5",
  Opened: "text-[#D4FF38] bg-[#D4FF38]/8",
  Pending: "text-orange-400 bg-orange-400/10",
};

const clients = ["All Clients", "Kinoya", "Tony's Woodfire", "Maison Dali", "PieHaus", "Revolver", "3Fils"];
const notifTypes = ["Project Update", "Invoice Reminder", "Report Ready", "Proposal Follow-up"];
const sendVia = ["Email", "Dashboard", "Both"];

export default function NotificationsPage() {
  const [form, setForm] = useState({ client: "", type: "", subject: "", message: "", via: "Email" });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-white tracking-wide">NOTIFICATIONS</h1>
        <p className="text-white/30 text-xs tracking-widest uppercase mt-1">Client communication center</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Sent This Month", value: "24" },
          { label: "Pending", value: "3" },
          { label: "Email Opens", value: "78%" },
        ].map((s) => (
          <div key={s.label} className="bg-[#141414] border border-white/5 p-6">
            <div className="font-display text-3xl text-white mb-1">{s.value}</div>
            <div className="text-[9px] tracking-widest uppercase text-white/30">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Send form */}
      <div className="bg-[#141414] border border-white/5 p-8">
        <h2 className="font-display text-xl text-white mb-6 tracking-wide">SEND NOTIFICATION</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Client</label>
            <select
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="w-full bg-[#0d0d0d] border border-white/10 text-white/70 text-xs px-3 py-2 outline-none"
            >
              {clients.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Type</label>
            <div className="flex flex-wrap gap-2">
              {notifTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, type: t })}
                  className={`px-3 py-1.5 text-[9px] tracking-widest uppercase border transition-colors ${
                    form.type === t
                      ? "border-[#D4FF38] text-[#D4FF38]"
                      : "border-white/15 text-white/30 hover:border-white/30 hover:text-white/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Subject</label>
            <input
              type="text"
              placeholder="Notification subject line"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-[#0d0d0d] border border-white/10 text-white/70 text-xs px-3 py-2 outline-none placeholder-white/20"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Message</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#0d0d0d] border border-white/10 text-white/70 text-xs px-3 py-2 outline-none resize-none placeholder-white/20"
              placeholder="Write your message..."
            />
          </div>
          <div>
            <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Send Via</label>
            <div className="flex gap-2">
              {sendVia.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setForm({ ...form, via: v })}
                  className={`px-3 py-1.5 text-[9px] tracking-widest uppercase border transition-colors ${
                    form.via === v
                      ? "border-[#D4FF38] text-[#D4FF38]"
                      : "border-white/15 text-white/30 hover:border-white/30 hover:text-white/50"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="border border-white/15 text-white/40 px-4 py-2 text-[9px] tracking-[0.2em] uppercase hover:text-white/70 transition-colors">
            Schedule
          </button>
          <button className="border border-[#D4FF38] text-[#D4FF38] px-4 py-2 text-[9px] tracking-[0.2em] uppercase hover:bg-[#D4FF38] hover:text-[#080808] transition-colors">
            Send Now →
          </button>
        </div>
      </div>

      {/* History */}
      <div className="bg-[#141414] border border-white/5">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="font-display text-lg text-white tracking-wide">HISTORY</h2>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              {["#", "Client", "Type", "Subject", "Sent", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[9px] tracking-widest uppercase text-white/25 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((n, i) => (
              <tr key={n.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i === history.length - 1 ? "border-b-0" : ""}`}>
                <td className="px-5 py-4 text-white/30 font-mono text-[10px]">{n.id}</td>
                <td className="px-5 py-4 text-white/80">{n.client}</td>
                <td className="px-5 py-4 text-white/40">{n.type}</td>
                <td className="px-5 py-4 text-white/60 max-w-[200px] truncate">{n.subject}</td>
                <td className="px-5 py-4 text-white/30">{n.sent}</td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-1 text-[9px] tracking-widest uppercase ${statusColor[n.status]}`}>
                    {n.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-[#D4FF38] transition-colors">
                    Resend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
