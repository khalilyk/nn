"use client";

import { useState } from "react";

const users = [
  { name: "Alex Chen", role: "Super Admin", email: "alex@notnormal.agency" },
  { name: "Jordan Mills", role: "Admin", email: "jordan@notnormal.agency" },
  { name: "Sam Rivera", role: "Project Manager", email: "sam@notnormal.agency" },
  { name: "Mia Park", role: "Designer", email: "mia@notnormal.agency" },
  { name: "Kinoya", role: "Client", email: "hello@kinoya.com.au" },
];

const roleColor: Record<string, string> = {
  "Super Admin": "text-[#D4FF38] bg-[#D4FF38]/8",
  Admin: "text-blue-400 bg-blue-400/10",
  "Project Manager": "text-orange-400 bg-orange-400/10",
  Designer: "text-purple-400 bg-purple-400/10",
  Client: "text-white/40 bg-white/5",
};

const templates = [
  { name: "Standard Proposal", type: "Proposal", updated: "15 May 2025" },
  { name: "Monthly Performance Report", type: "Report", updated: "10 May 2025" },
  { name: "Project Invoice", type: "Invoice", updated: "1 May 2025" },
  { name: "Campaign Report", type: "Report", updated: "28 Apr 2025" },
  { name: "Brand Audit Proposal", type: "Proposal", updated: "15 Apr 2025" },
];

const notifToggles = [
  { label: "Invoice Due", desc: "Notify when an invoice is due in 3 days", enabled: true },
  { label: "Proposal Opened", desc: "Notify when a client opens a proposal", enabled: true },
  { label: "Report Delivered", desc: "Notify when a report is sent to a client", enabled: false },
  { label: "New Inquiry", desc: "Notify on new contact form submissions", enabled: true },
];

const colorSwatches = [
  { name: "Black", hex: "#080808" },
  { name: "Bone", hex: "#E8E2D4" },
  { name: "Green", hex: "#D4FF38" },
  { name: "Admin BG", hex: "#0d0d0d" },
  { name: "Card BG", hex: "#141414" },
];

const tabs = ["Users & Permissions", "Templates", "Brand Assets", "Notification Settings"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Users & Permissions");
  const [toggles, setToggles] = useState(notifToggles.map((t) => t.enabled));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-white tracking-wide">SETTINGS</h1>
        <p className="text-white/30 text-xs tracking-widest uppercase mt-1">Admin configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-[9px] tracking-widest uppercase transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-[#D4FF38] text-[#D4FF38]"
                : "border-transparent text-white/30 hover:text-white/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Users & Permissions */}
      {activeTab === "Users & Permissions" && (
        <div className="bg-[#141414] border border-white/5">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-display text-lg text-white tracking-wide">TEAM MEMBERS</h2>
            <button className="border border-white/15 text-white/40 px-3 py-1.5 text-[9px] tracking-widest uppercase hover:text-white/70 transition-colors">
              + Invite User
            </button>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                {["Name", "Role", "Email", "Actions"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-[9px] tracking-widest uppercase text-white/25 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.email} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i === users.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-4 text-white/80">{u.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[9px] tracking-widest uppercase ${roleColor[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-6 py-4 text-white/40">{u.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      {["Edit", "Remove"].map((a) => (
                        <button key={a} className="text-[9px] tracking-widest uppercase text-white/30 hover:text-[#D4FF38] transition-colors">{a}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Templates */}
      {activeTab === "Templates" && (
        <div className="bg-[#141414] border border-white/5">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-display text-lg text-white tracking-wide">TEMPLATES</h2>
            <button className="border border-white/15 text-white/40 px-3 py-1.5 text-[9px] tracking-widest uppercase hover:text-white/70 transition-colors">
              + New Template
            </button>
          </div>
          <div>
            {templates.map((t, i) => (
              <div key={t.name} className={`flex items-center justify-between px-6 py-4 hover:bg-white/2 transition-colors ${i < templates.length - 1 ? "border-b border-white/5" : ""}`}>
                <div>
                  <p className="text-white/80 text-sm">{t.name}</p>
                  <p className="text-white/25 text-[10px] mt-0.5">{t.type} · Updated {t.updated}</p>
                </div>
                <div className="flex gap-3">
                  {["Edit", "Duplicate"].map((a) => (
                    <button key={a} className="text-[9px] tracking-widest uppercase text-white/30 hover:text-[#D4FF38] transition-colors">{a}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brand Assets */}
      {activeTab === "Brand Assets" && (
        <div className="space-y-6">
          {/* Logo variations */}
          <div className="bg-[#141414] border border-white/5 p-6">
            <h2 className="font-display text-lg text-white tracking-wide mb-4">LOGO VARIATIONS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Primary (Bone)", "Reversed (Black)", "Green Mark", "Wordmark Only"].map((v) => (
                <div key={v} className="border border-white/5 bg-[#0d0d0d] flex items-center justify-center h-24">
                  <div className="text-center">
                    <div className="font-display text-lg text-[#E8E2D4] mb-1">NN</div>
                    <p className="text-[9px] tracking-widest uppercase text-white/20">{v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color swatches */}
          <div className="bg-[#141414] border border-white/5 p-6">
            <h2 className="font-display text-lg text-white tracking-wide mb-4">COLOR PALETTE</h2>
            <div className="flex gap-3">
              {colorSwatches.map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 border border-white/10" style={{ background: c.hex }} />
                  <p className="text-[9px] tracking-widest uppercase text-white/30">{c.name}</p>
                  <p className="text-[9px] text-white/20 font-mono">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="bg-[#141414] border border-white/5 p-6">
            <h2 className="font-display text-lg text-white tracking-wide mb-4">TYPOGRAPHY</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-b border-white/5 pb-4">
                <p className="text-[9px] tracking-widest uppercase text-white/25 mb-2">Display — Bebas Neue</p>
                <div className="font-display text-4xl text-[#E8E2D4]">Aa Bb Cc</div>
              </div>
              <div className="border-b border-white/5 pb-4">
                <p className="text-[9px] tracking-widest uppercase text-white/25 mb-2">Body — DM Sans</p>
                <div className="text-2xl text-[#E8E2D4]/70">Aa Bb Cc</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "Notification Settings" && (
        <div className="bg-[#141414] border border-white/5">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="font-display text-lg text-white tracking-wide">EMAIL NOTIFICATIONS</h2>
          </div>
          <div>
            {notifToggles.map((t, i) => (
              <div key={t.label} className={`flex items-center justify-between px-6 py-5 ${i < notifToggles.length - 1 ? "border-b border-white/5" : ""}`}>
                <div>
                  <p className="text-white/80 text-sm">{t.label}</p>
                  <p className="text-white/25 text-[10px] mt-0.5">{t.desc}</p>
                </div>
                <button
                  onClick={() => setToggles((prev) => prev.map((v, idx) => idx === i ? !v : v))}
                  className={`relative w-10 h-5 transition-colors ${toggles[i] ? "bg-[#D4FF38]" : "bg-white/10"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-[#0d0d0d] transition-transform ${toggles[i] ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
