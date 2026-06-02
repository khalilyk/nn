"use client";

import Link from "next/link";

const activeProjects = [
  { name: "Kinoya — Content Strategy 2025", status: "Active", progress: 60, nextDelivery: "15 Jun 2025", manager: "Mia Park" },
  { name: "Kinoya — Menu Redesign", status: "In Review", progress: 85, nextDelivery: "8 Jun 2025", manager: "Jordan Mills" },
];

const notifications = [
  { type: "Report", msg: "May Social Report is ready to view.", time: "Today", action: "View Report" },
  { type: "Approval", msg: "Menu design draft — your feedback needed.", time: "Yesterday", action: "Review" },
  { type: "Invoice", msg: "Invoice #023 due in 5 days.", time: "2d ago", action: "View Invoice" },
];

const recentFiles = [
  { name: "Kinoya-Brand-Guidelines-v3.pdf", type: "PDF", date: "1 Jun 2025" },
  { name: "May-Social-Report.pdf", type: "PDF", date: "31 May 2025" },
  { name: "Menu-Draft-v2.jpg", type: "Image", date: "29 May 2025" },
];

const typeColors: Record<string, string> = { PDF: "#f59e0b", Image: "#60a5fa", Video: "#c084fc" };

export default function Portal() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <p className="text-[10px] tracking-widest uppercase text-white/30 mb-2">Welcome back</p>
        <h1 className="font-display text-4xl text-[#E8E2D4]">KINOYA</h1>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <div key={i} className="bg-[#141414] border border-white/5 rounded px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[9px] tracking-widest uppercase text-[#D4FF38]">{n.type}</span>
                <p className="text-sm text-white/60">{n.msg}</p>
                <span className="text-[9px] text-white/20">{n.time}</span>
              </div>
              <button className="text-[9px] tracking-widest uppercase text-[#D4FF38] hover:text-[#D4FF38]/70 transition-colors shrink-0">
                {n.action} →
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Projects */}
        <div className="bg-[#141414] border border-white/5 rounded p-6">
          <p className="text-[9px] tracking-widest uppercase text-white/30 mb-5">Active Projects</p>
          <div className="space-y-5">
            {activeProjects.map((p) => (
              <div key={p.name} className="border-b border-white/5 pb-5 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm text-white/70 font-medium mb-1">{p.name}</p>
                    <p className="text-[9px] tracking-widest uppercase text-white/25">{p.manager}</p>
                  </div>
                  <span className="text-[9px] tracking-widest uppercase text-[#D4FF38]">{p.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4FF38] rounded-full" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="text-[9px] text-white/30">{p.progress}%</span>
                </div>
                <p className="text-[9px] text-white/20 mt-2">Next delivery: {p.nextDelivery}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Projects", val: "2" },
              { label: "Reports", val: "14" },
              { label: "Outstanding", val: "$4,500" },
              { label: "Files Shared", val: "38" },
            ].map((s) => (
              <div key={s.label} className="bg-[#141414] border border-white/5 rounded p-4">
                <p className="text-[9px] tracking-widest uppercase text-white/25 mb-2">{s.label}</p>
                <p className="font-display text-2xl text-[#E8E2D4]/70">{s.val}</p>
              </div>
            ))}
          </div>

          {/* Recent files */}
          <div className="bg-[#141414] border border-white/5 rounded p-5">
            <p className="text-[9px] tracking-widest uppercase text-white/30 mb-4">Recent Files</p>
            <div className="space-y-3">
              {recentFiles.map((f) => (
                <div key={f.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] tracking-widest uppercase" style={{ color: typeColors[f.type] }}>{f.type}</span>
                    <span className="text-xs text-white/50 truncate max-w-[160px]">{f.name}</span>
                  </div>
                  <button className="text-[9px] text-white/25 hover:text-[#D4FF38] transition-colors">↓</button>
                </div>
              ))}
            </div>
            <Link href="/portal/files" className="text-[9px] tracking-widest uppercase text-white/20 hover:text-[#D4FF38] transition-colors mt-4 block">
              All Files →
            </Link>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-[#141414] border border-white/5 rounded p-6">
        <p className="text-[9px] tracking-widest uppercase text-white/30 mb-6">Project Timeline</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-5 pl-6">
            {[
              { date: "1 Jun 2025", event: "Brand Guidelines v3 delivered", done: true },
              { date: "8 Jun 2025", event: "Menu redesign final approval", done: false },
              { date: "15 Jun 2025", event: "June content calendar delivery", done: false },
              { date: "30 Jun 2025", event: "Monthly strategy review call", done: false },
            ].map((t, i) => (
              <div key={i} className="relative flex items-start gap-4">
                <div
                  className={`absolute -left-7 w-2.5 h-2.5 rounded-full border mt-0.5 ${
                    t.done ? "bg-[#D4FF38] border-[#D4FF38]" : "bg-transparent border-white/20"
                  }`}
                />
                <div>
                  <p className={`text-sm ${t.done ? "text-white/40 line-through" : "text-white/70"}`}>{t.event}</p>
                  <p className="text-[9px] tracking-widest text-white/20 mt-1">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
