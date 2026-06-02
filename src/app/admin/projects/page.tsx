"use client";

import { useState } from "react";

const projects = [
  { id: 1, name: "3Fils Rebrand", client: "3Fils", status: "Active", city: "Dubai", budget: "$28,000", due: "Jul 2025", progress: 65 },
  { id: 2, name: "Revolver Brand Identity", client: "Revolver", status: "Active", city: "Sydney", budget: "$18,500", due: "Jun 2025", progress: 90 },
  { id: 3, name: "Maison Dali Full Brand", client: "Maison Dali", status: "In Review", city: "Beirut", budget: "$42,000", due: "Aug 2025", progress: 40 },
  { id: 4, name: "PieHaus Social Strategy", client: "PieHaus", status: "Complete", city: "Sydney", budget: "$8,500", due: "May 2025", progress: 100 },
  { id: 5, name: "Tony's Brand Refresh", client: "Tony's Woodfire", status: "Active", city: "Sydney", budget: "$22,000", due: "Sep 2025", progress: 25 },
  { id: 6, name: "Bar Baker Concept", client: "Bar Baker", status: "Proposal", city: "Sydney", budget: "$35,000", due: "TBC", progress: 0 },
];

const statusColors: Record<string, string> = {
  Active: "#D4FF38",
  Complete: "#4ade80",
  "In Review": "#f59e0b",
  Proposal: "#60a5fa",
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Active", "In Review", "Complete", "Proposal"];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white/80 mb-1">PROJECTS</h1>
          <p className="text-[10px] tracking-widest uppercase text-white/25">{projects.length} total</p>
        </div>
        <button className="text-[9px] tracking-widest uppercase border border-[#D4FF38] text-[#D4FF38] px-5 py-2.5 hover:bg-[#D4FF38] hover:text-[#080808] transition-colors">
          + New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-[9px] tracking-widest uppercase px-3 py-1.5 border transition-colors ${
              filter === s ? "border-[#D4FF38] text-[#D4FF38]" : "border-white/10 text-white/30 hover:text-white/60"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-white/5 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Project", "Client", "City", "Budget", "Due", "Progress", "Status", ""].map((h) => (
                <th key={h} className="text-left text-[9px] tracking-widest uppercase text-white/25 px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors group">
                <td className="px-5 py-4 text-sm text-white/70 font-medium">{p.name}</td>
                <td className="px-5 py-4 text-xs text-white/40">{p.client}</td>
                <td className="px-5 py-4 text-xs text-white/40">{p.city}</td>
                <td className="px-5 py-4 text-xs text-white/40">{p.budget}</td>
                <td className="px-5 py-4 text-xs text-white/40">{p.due}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden" style={{ minWidth: 60 }}>
                      <div className="h-full bg-[#D4FF38] rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-[9px] text-white/30 w-6 text-right">{p.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: statusColors[p.status] }}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-[9px] tracking-widest uppercase text-white/20 hover:text-[#D4FF38] transition-colors opacity-0 group-hover:opacity-100">
                    Edit →
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
