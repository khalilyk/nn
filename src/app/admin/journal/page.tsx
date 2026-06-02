"use client";

import { useState } from "react";

const articles = [
  { id: 1, title: "Why the best restaurants don't market — they perform.", cat: "Hospitality", status: "Published", date: "2 May 2025", reads: 1240 },
  { id: 2, title: "The difference between a logo and a brand is 10,000 experiences.", cat: "Branding", status: "Published", date: "14 Apr 2025", reads: 890 },
  { id: 3, title: "Your guests remember how you made them feel, not what they ate.", cat: "Guest Experience", status: "Published", date: "1 Mar 2025", reads: 2100 },
  { id: 4, title: "Stop posting food photography. Start building a world.", cat: "Marketing", status: "Published", date: "12 Jan 2025", reads: 670 },
  { id: 5, title: "The new era of hospitality branding in the Middle East.", cat: "Hospitality", status: "Draft", date: "—", reads: 0 },
  { id: 6, title: "What Noma got right that every restaurant gets wrong.", cat: "Food Culture", status: "Scheduled", date: "15 Jun 2025", reads: 0 },
];

const statusColors: Record<string, string> = {
  Published: "#4ade80",
  Draft: "#60a5fa",
  Scheduled: "#f59e0b",
};

export default function Journal() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white/80 mb-1">JOURNAL CMS</h1>
          <p className="text-[10px] tracking-widest uppercase text-white/25">{articles.filter((a) => a.status === "Published").length} published articles</p>
        </div>
        <button
          onClick={() => setEditing(true)}
          className="text-[9px] tracking-widest uppercase border border-[#D4FF38] text-[#D4FF38] px-5 py-2.5 hover:bg-[#D4FF38] hover:text-[#080808] transition-colors"
        >
          + New Article
        </button>
      </div>

      {editing && (
        <div className="bg-[#141414] border border-[#D4FF38]/20 rounded p-6 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-widest uppercase text-[#D4FF38]">New Article</p>
            <button onClick={() => setEditing(false)} className="text-white/30 hover:text-white text-xs">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[9px] tracking-widest uppercase text-white/30 block mb-2">Title</label>
              <input className="w-full bg-[#1a1a1a] border border-white/10 rounded px-3 py-2 text-sm text-white/70 focus:border-[#D4FF38]/30 focus:outline-none" placeholder="Article title..." />
            </div>
            <div>
              <label className="text-[9px] tracking-widest uppercase text-white/30 block mb-2">Category</label>
              <select className="w-full bg-[#1a1a1a] border border-white/10 rounded px-3 py-2 text-sm text-white/70 focus:outline-none">
                {["Hospitality", "Marketing", "Branding", "Guest Experience", "Leadership", "Food Culture"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-[9px] tracking-widest uppercase text-white/30 block mb-2">Body</label>
            <textarea rows={6} className="w-full bg-[#1a1a1a] border border-white/10 rounded px-3 py-2 text-sm text-white/50 focus:border-[#D4FF38]/30 focus:outline-none resize-none" placeholder="Write your article..." />
          </div>
          <div className="flex gap-3">
            <button className="text-[9px] tracking-widest uppercase bg-[#D4FF38] text-[#080808] px-5 py-2.5 hover:bg-[#D4FF38]/80 transition-colors">Save Draft</button>
            <button className="text-[9px] tracking-widest uppercase border border-white/10 text-white/40 px-5 py-2.5 hover:border-white/30 transition-colors">Publish</button>
          </div>
        </div>
      )}

      <div className="bg-[#141414] border border-white/5 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Title", "Category", "Status", "Published", "Reads", ""].map((h) => (
                <th key={h} className="text-left text-[9px] tracking-widest uppercase text-white/25 px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 group transition-colors">
                <td className="px-5 py-4 text-sm text-white/60 max-w-[280px] truncate">{a.title}</td>
                <td className="px-5 py-4 text-[9px] tracking-widest uppercase text-[#D4FF38]/60">{a.cat}</td>
                <td className="px-5 py-4">
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: statusColors[a.status] }}>{a.status}</span>
                </td>
                <td className="px-5 py-4 text-xs text-white/30">{a.date}</td>
                <td className="px-5 py-4 text-xs text-white/40">{a.reads > 0 ? a.reads.toLocaleString() : "—"}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-[#D4FF38]">Edit</button>
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-white/60">SEO</button>
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
