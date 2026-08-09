import Link from "next/link";
import { sql, desc } from "drizzle-orm";
import PinterestBoard from "@/components/admin/PinterestBoard";
import { db, hasDb } from "@/lib/db";
import { events, submissions } from "@/lib/db/schema";
import { listClients, listInvoices } from "@/lib/invoice/store";
import { computeTotals, money } from "@/lib/invoice/types";
import { Card, PageHeader, StatTile, Button, Badge, Avatar, EmptyState, SectionCard, CardLink } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function timeAgo(d: Date | string): string {
  const t = new Date(d).getTime();
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(d).toLocaleDateString();
}

const EVENT_LABEL: Record<string, { verb: string; tone: "neutral" | "blue" | "green" | "amber" }> = {
  page_view: { verb: "Page view", tone: "neutral" },
  project_open: { verb: "Opened project", tone: "blue" },
  note_open: { verb: "Opened note", tone: "blue" },
  contact_submit: { verb: "New enquiry", tone: "green" },
  cta_click: { verb: "CTA click", tone: "amber" },
};

const INV_TONE: Record<string, "neutral" | "blue" | "red" | "green"> = { draft: "neutral", sent: "blue", overdue: "red", paid: "green" };

export default async function AdminDashboard() {
  const clients = await listClients().catch(() => []);
  const invoices = await listInvoices().catch(() => []);
  const real = invoices.filter((i) => !i.isTemplate);
  const pending = real.filter((i) => i.status !== "paid");
  const outstanding = pending.reduce((sum, i) => sum + computeTotals(i).total, 0);
  const paidRevenue = real.filter((i) => i.status === "paid").reduce((sum, i) => sum + computeTotals(i).total, 0);

  let views14 = 0;
  let leads14 = 0;
  let unreadLeads = 0;
  let daily: { day: string; count: number }[] = [];
  let activity: { type: string; label: string | null; path: string | null; createdAt: Date }[] = [];
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
      const [lr] = await db.select({ c: sql<number>`count(*)::int` }).from(submissions).where(sql`${submissions.createdAt} > now() - interval '14 days'`);
      leads14 = lr?.c ?? 0;
      const [ur] = await db.select({ c: sql<number>`count(*)::int` }).from(submissions).where(sql`${submissions.read} = false`);
      unreadLeads = ur?.c ?? 0;
      activity = (await db.select({ type: events.type, label: events.label, path: events.path, createdAt: events.createdAt }).from(events).orderBy(desc(events.createdAt)).limit(8)) as typeof activity;
    } catch { /* ignore */ }
  }
  const maxDay = Math.max(1, ...daily.map((d) => d.count));

  const byStatus = (["draft", "sent", "overdue", "paid"] as const).map((st) => ({
    status: st,
    count: real.filter((i) => i.status === st).length,
    total: real.filter((i) => i.status === st).reduce((s, i) => s + computeTotals(i).total, 0),
  }));
  const maxStatus = Math.max(1, ...byStatus.map((b) => b.total));
  const recentClients = clients.slice(0, 5);

  const today = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });

  const actions = [
    { label: "Edit site", href: "/admin/preview" },
    { label: "New invoice", href: "/admin/invoices" },
    { label: "New proposal", href: "/admin/proposals" },
    { label: "Projects", href: "/admin/projects" },
    { label: "Media", href: "/admin/media" },
  ];

  return (
    <div className="pb-10">
      <PageHeader title={`${greeting()}, Khalil`} subtitle={today} />

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-3">
        <StatTile value={views14.toLocaleString()} label="Page views" href="/admin/analytics" sub="last 14 days" />
        <StatTile value={leads14} label="Enquiries" href="/admin/submissions" sub="last 14 days" alert={unreadLeads} />
        <StatTile value={money(outstanding)} label="Outstanding" href="/admin/invoices" sub={`${pending.length} pending`} />
        <StatTile value={money(paidRevenue)} label="Revenue" href="/admin/invoices" sub="paid to date" />
        <StatTile value={clients.length} label="Clients" href="/admin/clients" sub="total" />
      </div>

      {/* quick actions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {actions.map((a) => (
          <Button key={a.label} href={a.href} variant="ghost" size="sm">{a.label}</Button>
        ))}
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <SectionCard title="Page views · last 14 days" action={<CardLink href="/admin/analytics">Analytics →</CardLink>}>
          {daily.length === 0 ? (
            <EmptyState>No views recorded yet.</EmptyState>
          ) : (
            <div className="flex items-end gap-1.5 h-32">
              {daily.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[9px] text-black/45 opacity-0 group-hover:opacity-100">{d.count}</span>
                  <div className="w-full rounded-t" style={{ height: `${Math.max(3, (d.count / maxDay) * 100)}%`, background: "linear-gradient(180deg, #2C2D33 0%, #55565E 100%)" }} title={`${d.day}: ${d.count}`} />
                  <span className="text-[8px] text-black/35 whitespace-nowrap">{d.day.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Invoices by status" action={<CardLink href="/admin/invoices">Invoices →</CardLink>}>
          {real.length === 0 ? (
            <EmptyState>No invoices yet.</EmptyState>
          ) : (
            <div className="space-y-3 pt-1">
              {byStatus.map((b) => (
                <div key={b.status} className="flex items-center gap-3">
                  <span className="text-[11px] uppercase tracking-wide text-black/55 w-16 shrink-0">{b.status}</span>
                  <div className="flex-1 h-5 rounded-full bg-black/[0.05] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(b.total / maxStatus) * 100}%`, background: b.status === "paid" ? "#7FD6A0" : b.status === "overdue" ? "#EFA3A3" : b.status === "sent" ? "#A9AEF2" : "#C7C7CE" }} />
                  </div>
                  <span className="text-[12px] text-[#0A0A0A] w-24 text-right shrink-0">{money(b.total)} <span className="text-black/35">({b.count})</span></span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      {/* activity + pending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <SectionCard title="Recent activity" action={<CardLink href="/admin/analytics">All →</CardLink>}>
          {activity.length === 0 ? (
            <EmptyState>No activity recorded yet.</EmptyState>
          ) : (
            <div className="space-y-1">
              {activity.map((e, i) => {
                const meta = EVENT_LABEL[e.type] || { verb: e.type, tone: "neutral" as const };
                return (
                  <div key={i} className="flex items-center gap-3 py-1.5">
                    <Badge tone={meta.tone}>{meta.verb}</Badge>
                    <span className="text-[12px] text-black/65 flex-1 min-w-0 truncate">{e.label || e.path || "—"}</span>
                    <span className="text-[11px] text-black/35 shrink-0">{timeAgo(e.createdAt)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Pending invoices" action={<CardLink href="/admin/invoices">View all →</CardLink>}>
          {pending.length === 0 ? (
            <EmptyState>Nothing outstanding. 🎉</EmptyState>
          ) : (
            <div className="space-y-1">
              {pending.slice(0, 6).map((inv) => (
                <Link key={inv.id} href={`/admin/invoices/${inv.id}`} className="flex items-center gap-3 rounded-xl hover:bg-black/[0.03] px-2 py-2 -mx-2">
                  <span className="text-[12px] font-semibold text-[#0A0A0A] w-16 shrink-0">{inv.number}</span>
                  <span className="text-[12px] text-black/65 flex-1 min-w-0 truncate">{inv.client.name || "—"}</span>
                  <span className="text-[12px] font-semibold text-[#0A0A0A]">{money(computeTotals(inv).total)}</span>
                  <Badge tone={INV_TONE[inv.status] || "neutral"}>{inv.status}</Badge>
                </Link>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      {/* clients + moodboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <SectionCard title="New clients" action={<CardLink href="/admin/clients">View all →</CardLink>}>
          {recentClients.length === 0 ? (
            <EmptyState>No clients yet.</EmptyState>
          ) : (
            <div className="space-y-1">
              {recentClients.map((c) => (
                <div key={c.id} className="flex items-center gap-3 py-1.5">
                  <Avatar name={c.name} />
                  <div className="min-w-0">
                    <div className="text-[13px] text-[#0A0A0A] truncate">{c.name}{c.company ? ` · ${c.company}` : ""}</div>
                    {c.email && <div className="text-[11px] text-black/45 truncate">{c.email}</div>}
                  </div>
                  <span className="ml-auto text-[10px] text-black/35 shrink-0">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold text-[#0A0A0A]">Moodboard</h2>
            <CardLink href="https://www.pinterest.com/khalilyk/not-normal/">Pinterest →</CardLink>
          </div>
          <PinterestBoard board="khalilyk/not-normal" href="https://www.pinterest.com/khalilyk/not-normal/" />
        </Card>
      </div>
    </div>
  );
}
