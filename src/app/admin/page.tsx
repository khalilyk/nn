import Link from "next/link";

const stats = [
  { label: "Active Projects", val: "8", delta: "+2 this month", color: "#D4FF38" },
  { label: "Active Clients", val: "14", delta: "+3 this quarter", color: "#D4FF38" },
  { label: "Outstanding Invoices", val: "$42,500", delta: "3 unpaid", color: "#ff6b6b" },
  { label: "Proposals Sent", val: "6", delta: "2 awaiting response", color: "#E8E2D4" },
];

const recentActivity = [
  { type: "Invoice", desc: "Invoice #024 sent to Revolver", time: "2h ago", status: "Sent" },
  { type: "Proposal", desc: "Proposal for Maison Dali approved", time: "5h ago", status: "Approved" },
  { type: "Project", desc: "3Fils — Final delivery uploaded", time: "1d ago", status: "Complete" },
  { type: "Client", desc: "New inquiry from Bar Baker Dubai", time: "2d ago", status: "New" },
  { type: "Invoice", desc: "Invoice #021 paid by Kinoya", time: "3d ago", status: "Paid" },
  { type: "Report", desc: "May report sent to Tony's Woodfire", time: "4d ago", status: "Sent" },
];

const statusColors: Record<string, string> = {
  Sent: "#D4FF38",
  Approved: "#4ade80",
  Complete: "#60a5fa",
  New: "#f59e0b",
  Paid: "#4ade80",
};

const quickLinks = [
  { label: "New Project", href: "/admin/projects", icon: "+" },
  { label: "New Client", href: "/admin/clients", icon: "+" },
  { label: "New Proposal", href: "/admin/proposals", icon: "+" },
  { label: "New Invoice", href: "/admin/invoices", icon: "+" },
  { label: "New Article", href: "/admin/journal", icon: "+" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white/80 mb-1">DASHBOARD</h1>
        <p className="text-[10px] tracking-widest uppercase text-white/25">Monday, June 2025</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#141414] border border-white/5 p-5 rounded">
            <p className="text-[9px] tracking-widest uppercase text-white/30 mb-3">{s.label}</p>
            <p className="font-display text-3xl mb-1" style={{ color: s.color }}>{s.val}</p>
            <p className="text-[9px] text-white/20">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Activity feed */}
        <div className="md:col-span-2 bg-[#141414] border border-white/5 rounded p-6">
          <p className="text-[9px] tracking-widest uppercase text-white/30 mb-6">Recent Activity</p>
          <div className="space-y-0">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-xs text-white/60">{a.desc}</p>
                  <p className="text-[9px] tracking-widest uppercase text-white/20 mt-1">{a.type} · {a.time}</p>
                </div>
                <span
                  className="text-[9px] tracking-widest uppercase px-2 py-1 rounded-full border"
                  style={{ color: statusColors[a.status] || "#fff", borderColor: statusColors[a.status] || "#fff" + "40" }}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-[#141414] border border-white/5 rounded p-6">
            <p className="text-[9px] tracking-widest uppercase text-white/30 mb-4">Quick Actions</p>
            <div className="space-y-2">
              {quickLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="flex items-center gap-3 text-xs text-white/40 hover:text-[#D4FF38] transition-colors py-2 border-b border-white/5 last:border-0"
                >
                  <span className="w-5 h-5 border border-white/10 rounded flex items-center justify-center text-[10px]">{l.icon}</span>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded p-6">
            <p className="text-[9px] tracking-widest uppercase text-white/30 mb-4">Client Portal</p>
            <Link href="/portal" target="_blank" className="text-[10px] tracking-widest uppercase text-[#D4FF38] hover:text-[#D4FF38]/70 transition-colors">
              View Client View →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
