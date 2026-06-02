"use client";

import { useState } from "react";

const clients = [
  { id: 1, name: "3Fils", contact: "Ahmed Al Mansoori", email: "ahmed@3fils.com", city: "Dubai", projects: 2, status: "Active", since: "Jan 2024" },
  { id: 2, name: "Revolver", contact: "Sarah Kim", email: "sarah@revolverbar.com.au", city: "Sydney", projects: 1, status: "Active", since: "Mar 2024" },
  { id: 3, name: "Maison Dali", contact: "Pierre Dali", email: "pierre@maisondali.com", city: "Beirut", projects: 1, status: "Active", since: "Apr 2024" },
  { id: 4, name: "PieHaus", contact: "Stasha Brown", email: "stasha@piehaus.com.au", city: "Sydney", projects: 3, status: "Retained", since: "Jun 2023" },
  { id: 5, name: "Tony's Woodfire", contact: "Zara Tanaka", email: "zara@tonyswoodfire.com.au", city: "Sydney", projects: 2, status: "Retained", since: "Jan 2023" },
  { id: 6, name: "Kinoya", contact: "Neha Patel", email: "neha@kinoya.com.au", city: "Sydney", projects: 4, status: "Retained", since: "Aug 2022" },
  { id: 7, name: "Mimi Kakushi", contact: "James Chen", email: "james@mimikakushi.com", city: "Dubai", projects: 1, status: "Complete", since: "Nov 2022" },
  { id: 8, name: "Bar Baker", contact: "Tom Baker", email: "tom@barbaker.com.au", city: "Sydney", projects: 0, status: "Prospect", since: "Jun 2025" },
];

const statusColors: Record<string, string> = {
  Active: "#D4FF38",
  Retained: "#4ade80",
  Complete: "#60a5fa",
  Prospect: "#f59e0b",
};

export default function Clients() {
  const [search, setSearch] = useState("");
  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white/80 mb-1">CLIENTS</h1>
          <p className="text-[10px] tracking-widest uppercase text-white/25">{clients.length} total · 5 active</p>
        </div>
        <button className="text-[9px] tracking-widest uppercase border border-[#D4FF38] text-[#D4FF38] px-5 py-2.5 hover:bg-[#D4FF38] hover:text-[#080808] transition-colors">
          + New Client
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clients..."
          className="w-full max-w-xs bg-[#141414] border border-white/10 rounded px-4 py-2.5 text-xs text-white/60 placeholder-white/20 focus:border-[#D4FF38]/40 focus:outline-none transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-white/5 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Client", "Contact", "Email", "City", "Projects", "Status", "Since", ""].map((h) => (
                <th key={h} className="text-left text-[9px] tracking-widest uppercase text-white/25 px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors group">
                <td className="px-5 py-4 text-sm text-white/70 font-medium">{c.name}</td>
                <td className="px-5 py-4 text-xs text-white/40">{c.contact}</td>
                <td className="px-5 py-4 text-xs text-white/30">{c.email}</td>
                <td className="px-5 py-4 text-xs text-white/40">{c.city}</td>
                <td className="px-5 py-4 text-xs text-white/40">{c.projects}</td>
                <td className="px-5 py-4">
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: statusColors[c.status] }}>
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-white/30">{c.since}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-[#D4FF38] transition-colors">Edit</button>
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors">Portal →</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
