import Link from "next/link";
import { sql } from "drizzle-orm";
import PinterestBoard from "@/components/admin/PinterestBoard";
import { db, hasDb } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { listClients, listInvoices } from "@/lib/invoice/store";
import { computeTotals, money } from "@/lib/invoice/types";

export const dynamic = "force-dynamic";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const STATUS_COLOR: Record<string, string> = {
  draft: "bg-black/10 text-black/60",
  sent: "bg-[#2D6BFF]/15 text-[#2D6BFF]",
  overdue: "bg-[#c0392b]/15 text-[#c0392b]",
  paid: "bg-[#1f9d55]/15 text-[#1f9d55]",
};

export default async function AdminDashboard() {
  const clients = await listClients().catch(() => []);
  const invoices = await listInvoices().catch(() => []);
  const pending = invoices.filter((i) => !i.isTemplate && i.status !== "paid");
  const outstanding = pending.reduce((sum, i) => sum + computeTotals(i).total, 0);

  let views14 = 0;
  let daily: { day: string; count: number }[] = [];
  if (hasDb) {
    try {
      const [r] = await db
        .select({ c: sql<number>`count(*)::int` })
        .from(events)
        .where(sql`${events.type} = 'page_view' and ${events.createdAt} > now() - interval '14 days'`);
      views14 = r?.c ?? 0;
      daily = (await db
        .select({ day: sql<string>`to_char(${events.createdAt}, 'DD Mon')`, count: sql<number>`count(*)::int` })
        .from(events)
        .where(sql`${events.type} = 'page_view' and ${events.createdAt} > now() - interval '14 days'`)
        .groupBy(sql`to_char(${events.createdAt}, 'DD Mon'), date_trunc('day', ${events.createdAt})`)
        .orderBy(sql`date_trunc('day', ${events.createdAt})`)) as { day: string; count: number }[];
    } catch { /* ignore */ }
  }
  const maxDay = Math.max(1, ...daily.map((d) => d.count));

  // invoices by status (excludes templates)
  const real = invoices.filter((i) => !i.isTemplate);
  const byStatus = (["draft", "sent", "overdue", "paid"] as const).map((st) => ({
    status: st,
    count: real.filter((i) => i.status === st).length,
    total: real.filter((i) => i.status === st).reduce((s, i) => s + computeTotals(i).total, 0),
  }));
  const maxStatus = Math.max(1, ...byStatus.map((b) => b.total));

  const recentClients = clients.slice(0, 6);
  const currency = pending[0]?.currency || "AUD";

  const stats = [
    { label: "Page views · 14d", value: views14.toLocaleString() },
    { label: "Pending invoices", value: pending.length },
    { label: "Outstanding", value: money(outstanding) },
    { label: "Clients", value: clients.length },
  ];

  return (
    <div className="pb-10">
      <div className="flex flex-wrap items-end justify-between gap-3 pt-1 pb-7">
        <h1 className="text-[#0A0A0A]" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
          {greeting()}, <span className="text-[#0A0A0A]/45">Khalil</span>
        </h1>
        <Link href="/admin/preview" className="rounded-full bg-[#0A0A0A] text-white px-5 py-2.5 text-[12px] tracking-[0.12em] uppercase hover:opacity-80 transition-opacity">
          Open live editor →
        </Link>
      </div>

      {/* stat row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`rounded-3xl p-5 shadow-sm ${i === 1 ? "bg-[#D7F23A]" : "bg-white"}`}>
            <div className="text-[30px] font-bold leading-none tracking-tight text-[#0A0A0A]">{s.value}</div>
            <div className="mt-3 text-[11px] tracking-[0.12em] uppercase text-[#0A0A0A]/50">{s.label}</div>
          </div>
        ))}
      </div>

      {/* graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* page views over 14 days */}
        <div className="rounded-3xl bg-white shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold text-[#0A0A0A]">Page views · last 14 days</h2>
            <Link href="/admin/analytics" className="text-[12px] text-black/45 hover:text-black">Analytics →</Link>
          </div>
          {daily.length === 0 ? (
            <p className="text-[12px] text-black/40">No views recorded yet.</p>
          ) : (
            <div className="flex items-end gap-1.5 h-32">
              {daily.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[9px] text-black/45 opacity-0 group-hover:opacity-100">{d.count}</span>
                  <div className="w-full rounded-t" style={{ height: `${Math.max(3, (d.count / maxDay) * 100)}%`, background: "linear-gradient(180deg, #2D6BFF 0%, #6F9BFF 100%)" }} title={`${d.day}: ${d.count}`} />
                  <span className="text-[8px] text-black/35 whitespace-nowrap">{d.day.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* invoices by status */}
        <div className="rounded-3xl bg-white shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold text-[#0A0A0A]">Invoices by status</h2>
            <Link href="/admin/invoices" className="text-[12px] text-black/45 hover:text-black">Invoices →</Link>
          </div>
          {real.length === 0 ? (
            <p className="text-[12px] text-black/40">No invoices yet.</p>
          ) : (
            <div className="space-y-3 pt-1">
              {byStatus.map((b) => (
                <div key={b.status} className="flex items-center gap-3">
                  <span className="text-[11px] uppercase tracking-wide text-black/55 w-16 shrink-0">{b.status}</span>
                  <div className="flex-1 h-5 rounded-full bg-black/[0.05] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(b.total / maxStatus) * 100}%`, background: b.status === "paid" ? "#1f9d55" : b.status === "overdue" ? "#c0392b" : b.status === "sent" ? "#2D6BFF" : "#9A9A9A" }} />
                  </div>
                  <span className="text-[12px] text-[#0A0A0A] w-24 text-right shrink-0">{money(b.total)} <span className="text-black/35">({b.count})</span></span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* pending invoices */}
        <div className="rounded-3xl bg-white shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold text-[#0A0A0A]">Pending invoices</h2>
            <Link href="/admin/invoices" className="text-[12px] text-black/45 hover:text-black">View all →</Link>
          </div>
          {pending.length === 0 ? (
            <p className="text-[12px] text-black/40">Nothing outstanding. 🎉</p>
          ) : (
            <div className="space-y-2">
              {pending.slice(0, 6).map((inv) => (
                <Link key={inv.id} href={`/admin/invoices/${inv.id}`} className="flex items-center gap-3 rounded-xl hover:bg-black/[0.03] px-2 py-2 -mx-2">
                  <span className="text-[12px] font-semibold text-[#0A0A0A] w-16 shrink-0">{inv.number}</span>
                  <span className="text-[12px] text-black/65 flex-1 min-w-0 truncate">{inv.client.name || "—"}</span>
                  <span className="text-[12px] font-semibold text-[#0A0A0A]">{money(computeTotals(inv).total)}</span>
                  <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${STATUS_COLOR[inv.status] || ""}`}>{inv.status}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* new clients */}
        <div className="rounded-3xl bg-white shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold text-[#0A0A0A]">New clients</h2>
            <Link href="/admin/clients" className="text-[12px] text-black/45 hover:text-black">View all →</Link>
          </div>
          {recentClients.length === 0 ? (
            <p className="text-[12px] text-black/40">No clients yet.</p>
          ) : (
            <div className="space-y-2">
              {recentClients.map((c) => (
                <div key={c.id} className="flex items-center gap-3 px-2 py-2 -mx-2">
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-[#E8E8EA] text-[11px] font-bold text-[#0A0A0A] shrink-0">{(c.name || "?").charAt(0).toUpperCase()}</span>
                  <div className="min-w-0">
                    <div className="text-[13px] text-[#0A0A0A] truncate">{c.name}{c.company ? ` · ${c.company}` : ""}</div>
                    {c.email && <div className="text-[11px] text-black/45 truncate">{c.email}</div>}
                  </div>
                  <span className="ml-auto text-[10px] text-black/35 shrink-0">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* analytics shortcut */}
      <Link href="/admin/analytics" className="mt-3 block rounded-3xl bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[13px] font-semibold text-[#0A0A0A] mb-1">Analytics</h2>
            <p className="text-[12px] text-black/45">{views14.toLocaleString()} page views in the last 14 days · live activity, top pages and events.</p>
          </div>
          <span className="text-[12px] text-black/45">Open →</span>
        </div>
      </Link>

      {/* Pinterest moodboard — 6 random pins, re-rolled each load */}
      <div className="mt-3">
        <PinterestBoard board="khalilyk/not-normal" href="https://www.pinterest.com/khalilyk/not-normal/" />
      </div>
    </div>
  );
}
