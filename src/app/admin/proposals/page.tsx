"use client";

import { useState } from "react";

const proposals = [
  { id: "P-025", client: "Bar Baker", title: "Full Brand Identity & Launch Strategy", value: "$35,000", status: "Sent", sent: "28 May 2025", expires: "11 Jun 2025" },
  { id: "P-024", client: "Maison Dali", title: "Ongoing Retainer — Content & Social", value: "$4,500/mo", status: "Approved", sent: "12 May 2025", expires: "—" },
  { id: "P-023", client: "Revolver", title: "Phase 2 — Digital & Web", value: "$14,000", status: "In Review", sent: "5 May 2025", expires: "19 May 2025" },
  { id: "P-022", client: "3Fils", title: "Annual Brand Partnership", value: "$65,000", status: "Draft", sent: "—", expires: "—" },
  { id: "P-021", client: "Oakberry", title: "Brand Refresh", value: "$22,000", status: "Declined", sent: "1 Apr 2025", expires: "—" },
];

const statusColors: Record<string, string> = {
  Sent: "#D4FF38",
  Approved: "#4ade80",
  "In Review": "#f59e0b",
  Draft: "#60a5fa",
  Declined: "#ef4444",
};

export default function Proposals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white/80 mb-1">PROPOSALS</h1>
          <p className="text-[10px] tracking-widest uppercase text-white/25">2 awaiting response</p>
        </div>
        <button className="text-[9px] tracking-widest uppercase border border-[#D4FF38] text-[#D4FF38] px-5 py-2.5 hover:bg-[#D4FF38] hover:text-[#080808] transition-colors">
          + New Proposal
        </button>
      </div>

      <div className="bg-[#141414] border border-white/5 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["#", "Client", "Proposal", "Value", "Status", "Sent", "Expires", ""].map((h) => (
                <th key={h} className="text-left text-[9px] tracking-widest uppercase text-white/25 px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 group transition-colors">
                <td className="px-5 py-4 text-[10px] text-white/30 font-mono">{p.id}</td>
                <td className="px-5 py-4 text-sm text-white/70">{p.client}</td>
                <td className="px-5 py-4 text-xs text-white/50 max-w-[200px]">{p.title}</td>
                <td className="px-5 py-4 text-xs text-white/60 font-medium">{p.value}</td>
                <td className="px-5 py-4">
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: statusColors[p.status] }}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-white/30">{p.sent}</td>
                <td className="px-5 py-4 text-xs text-white/30">{p.expires}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-[#D4FF38]">Edit</button>
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-white/60">PDF</button>
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-white/60">Dupe</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Templates note */}
      <div className="bg-[#141414] border border-white/5 rounded p-6">
        <p className="text-[9px] tracking-widest uppercase text-white/30 mb-3">Proposal Templates</p>
        <div className="flex gap-3 flex-wrap">
          {["Brand Identity", "Social Retainer", "Full Service", "Consulting", "Digital Only"].map((t) => (
            <button key={t} className="text-[9px] tracking-widest uppercase border border-white/10 text-white/30 px-4 py-2 hover:border-[#D4FF38]/40 hover:text-[#D4FF38] transition-colors">
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
