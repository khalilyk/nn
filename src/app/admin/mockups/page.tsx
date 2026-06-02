"use client";

import { useState } from "react";

const decks = [
  { title: "Kinoya Social Mockups v2", slides: 12, updated: "28 May 2025", status: "Active" },
  { title: "Revolver Brand Presentation", slides: 8, updated: "20 May 2025", status: "Sent" },
  { title: "Maison Dali Website Mockup", slides: 15, updated: "10 May 2025", status: "Approved" },
  { title: "3Fils Identity Deck v3", slides: 22, updated: "1 May 2025", status: "In Review" },
];

const statusColor: Record<string, string> = {
  Active: "text-[#D4FF38] bg-[#D4FF38]/8",
  Sent: "text-blue-400 bg-blue-400/10",
  Approved: "text-green-400 bg-green-400/10",
  "In Review": "text-orange-400 bg-orange-400/10",
};

const clients = ["Kinoya", "Tony's Woodfire", "Maison Dali", "PieHaus", "Revolver", "3Fils"];
const deckTypes = ["Website", "Branding", "Campaign", "Packaging"];

export default function MockupsPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", client: "", type: "" });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white tracking-wide">MOCKUP DECKS</h1>
          <p className="text-white/30 text-xs tracking-widest uppercase mt-1">Presentation & deck builder</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="border border-[#D4FF38] text-[#D4FF38] px-4 py-2 text-[9px] tracking-[0.2em] uppercase hover:bg-[#D4FF38] hover:text-[#080808] transition-colors"
        >
          + New Deck
        </button>
      </div>

      {/* Deck grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {decks.map((deck) => (
          <div key={deck.title} className="bg-[#141414] border border-white/5 p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <h3 className="font-display text-lg text-white leading-tight tracking-wide">{deck.title.toUpperCase()}</h3>
              <span className={`px-2 py-1 text-[9px] tracking-widest uppercase shrink-0 ml-3 ${statusColor[deck.status]}`}>
                {deck.status}
              </span>
            </div>
            <div className="flex gap-5 text-[10px] text-white/30">
              <span>{deck.slides} slides</span>
              <span>Updated {deck.updated}</span>
            </div>
            <div className="flex gap-3 pt-2 border-t border-white/5">
              {["View", "Export PDF", "Duplicate"].map((a) => (
                <button key={a} className="text-[9px] tracking-widest uppercase text-white/30 hover:text-[#D4FF38] transition-colors">
                  {a}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* New Deck Form */}
      {showForm && (
        <div className="bg-[#141414] border border-white/5 p-8">
          <h2 className="font-display text-xl text-white mb-6 tracking-wide">NEW DECK</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Deck Title</label>
              <input
                type="text"
                placeholder="e.g. Kinoya Social Mockups v3"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#0d0d0d] border border-white/10 text-white/70 text-xs px-3 py-2 outline-none placeholder-white/20"
              />
            </div>
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
              <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Type</label>
              <div className="flex gap-2 flex-wrap">
                {deckTypes.map((t) => (
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
              <label className="block text-[9px] tracking-widest uppercase text-white/30 mb-2">Upload Mockups</label>
              <button className="w-full border border-dashed border-white/10 text-white/25 text-[9px] tracking-widest uppercase px-3 py-6 hover:border-white/20 hover:text-white/40 transition-colors">
                Drop files here or click to upload
              </button>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="border border-[#D4FF38] text-[#D4FF38] px-4 py-2 text-[9px] tracking-[0.2em] uppercase hover:bg-[#D4FF38] hover:text-[#080808] transition-colors">
              Create Deck
            </button>
            <button onClick={() => setShowForm(false)} className="text-white/30 text-[9px] tracking-widest uppercase hover:text-white/50 transition-colors px-4 py-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
