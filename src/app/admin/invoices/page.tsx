"use client";

const invoices = [
  { id: "INV-024", client: "Revolver", desc: "Brand Identity — Phase 2", amount: "$9,250", status: "Unpaid", issued: "25 May 2025", due: "8 Jun 2025", overdue: false },
  { id: "INV-023", client: "Maison Dali", desc: "Retainer — May 2025", amount: "$4,500", status: "Paid", issued: "1 May 2025", due: "15 May 2025", overdue: false },
  { id: "INV-022", client: "3Fils", desc: "Brand Identity — Milestone 2", amount: "$14,000", status: "Unpaid", issued: "10 May 2025", due: "24 May 2025", overdue: true },
  { id: "INV-021", client: "Kinoya", desc: "Monthly Content — Apr 2025", amount: "$3,800", status: "Paid", issued: "1 Apr 2025", due: "15 Apr 2025", overdue: false },
  { id: "INV-020", client: "PieHaus", desc: "Social Strategy — Q1", amount: "$8,500", status: "Paid", issued: "1 Mar 2025", due: "15 Mar 2025", overdue: false },
  { id: "INV-019", client: "Tony's Woodfire", desc: "Brand Refresh — Deposit", amount: "$11,000", status: "Unpaid", issued: "20 Apr 2025", due: "4 May 2025", overdue: true },
];

const statusColors: Record<string, string> = { Paid: "#4ade80", Unpaid: "#f59e0b" };

const totalOutstanding = invoices.filter((i) => i.status === "Unpaid").reduce((sum, i) => sum + parseFloat(i.amount.replace(/[$,]/g, "")), 0);

export default function Invoices() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white/80 mb-1">INVOICES</h1>
          <p className="text-[10px] tracking-widest uppercase text-white/25">
            ${totalOutstanding.toLocaleString()} outstanding
          </p>
        </div>
        <button className="text-[9px] tracking-widest uppercase border border-[#D4FF38] text-[#D4FF38] px-5 py-2.5 hover:bg-[#D4FF38] hover:text-[#080808] transition-colors">
          + New Invoice
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Outstanding", val: `$${totalOutstanding.toLocaleString()}`, color: "#f59e0b" },
          { label: "Paid This Month", val: "$8,300", color: "#4ade80" },
          { label: "Overdue", val: "2 invoices", color: "#ef4444" },
        ].map((s) => (
          <div key={s.label} className="bg-[#141414] border border-white/5 rounded p-5">
            <p className="text-[9px] tracking-widest uppercase text-white/30 mb-2">{s.label}</p>
            <p className="font-display text-2xl" style={{ color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#141414] border border-white/5 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["#", "Client", "Description", "Amount", "Status", "Issued", "Due", ""].map((h) => (
                <th key={h} className="text-left text-[9px] tracking-widest uppercase text-white/25 px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className={`border-b border-white/5 last:border-0 hover:bg-white/2 group transition-colors ${inv.overdue ? "bg-red-950/10" : ""}`}>
                <td className="px-5 py-4 text-[10px] text-white/30 font-mono">{inv.id}</td>
                <td className="px-5 py-4 text-sm text-white/70">{inv.client}</td>
                <td className="px-5 py-4 text-xs text-white/40">{inv.desc}</td>
                <td className="px-5 py-4 text-sm text-white/70 font-medium">{inv.amount}</td>
                <td className="px-5 py-4">
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: inv.overdue ? "#ef4444" : statusColors[inv.status] }}>
                    {inv.overdue ? "Overdue" : inv.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-white/30">{inv.issued}</td>
                <td className="px-5 py-4 text-xs text-white/30">{inv.due}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-[#D4FF38]">View</button>
                    <button className="text-[9px] tracking-widest uppercase text-white/30 hover:text-white/60">PDF</button>
                    {inv.status === "Unpaid" && (
                      <button className="text-[9px] tracking-widest uppercase text-[#f59e0b]/60 hover:text-[#f59e0b]">Remind</button>
                    )}
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
