import { desc, sql } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { PageHeader, Card, SectionCard, StatTile, Badge, EmptyState } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  page_view: "Page views",
  project_open: "Project opens",
  note_open: "Note opens",
  contact_submit: "Form submissions",
  cta_click: "“Let’s chat” clicks",
};
const EVENT_TONE: Record<string, "neutral" | "blue" | "green" | "amber"> = {
  page_view: "neutral",
  project_open: "blue",
  note_open: "blue",
  contact_submit: "green",
  cta_click: "amber",
};

function timeAgo(d: Date | string): string {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24); if (days < 7) return `${days}d ago`;
  return new Date(d).toLocaleDateString();
}

export default async function AnalyticsPage() {
  let ok = false;
  let totals: { type: string; count: number }[] = [];
  let topProjects: { label: string | null; count: number }[] = [];
  let recent: { id: number; type: string; label: string | null; path: string | null; createdAt: Date }[] = [];
  let last14: { day: string; count: number }[] = [];
  let views14 = 0;
  let topPages: { path: string | null; count: number }[] = [];
  let topCountries: { country: string | null; count: number }[] = [];

  if (hasDb) {
    try {
      totals = (await db.select({ type: events.type, count: sql<number>`count(*)::int` }).from(events).groupBy(events.type)) as { type: string; count: number }[];
      topPages = (await db
        .select({ path: events.path, count: sql<number>`count(*)::int` })
        .from(events)
        .where(sql`${events.type} = 'page_view' and ${events.path} is not null`)
        .groupBy(events.path).orderBy(desc(sql`count(*)`)).limit(8)) as { path: string | null; count: number }[];
      topProjects = (await db
        .select({ label: events.label, count: sql<number>`count(*)::int` })
        .from(events)
        .where(sql`${events.type} = 'project_open' and ${events.label} is not null`)
        .groupBy(events.label).orderBy(desc(sql`count(*)`)).limit(8)) as { label: string | null; count: number }[];
      last14 = (await db
        .select({ day: sql<string>`to_char(${events.createdAt}, 'Mon DD')`, count: sql<number>`count(*)::int` })
        .from(events)
        .where(sql`${events.type} = 'page_view' and ${events.createdAt} > now() - interval '14 days'`)
        .groupBy(sql`to_char(${events.createdAt}, 'Mon DD'), date_trunc('day', ${events.createdAt})`)
        .orderBy(sql`date_trunc('day', ${events.createdAt})`)) as { day: string; count: number }[];
      recent = await db.select({ id: events.id, type: events.type, label: events.label, path: events.path, createdAt: events.createdAt }).from(events).orderBy(desc(events.createdAt)).limit(30);
      views14 = last14.reduce((n, d) => n + d.count, 0);
      ok = true;
    } catch { ok = false; }
    // isolated so a pre-migration `country` column can't break the whole page
    try {
      topCountries = (await db
        .select({ country: events.country, count: sql<number>`count(*)::int` })
        .from(events)
        .where(sql`${events.country} is not null`)
        .groupBy(events.country).orderBy(desc(sql`count(*)`)).limit(8)) as { country: string | null; count: number }[];
    } catch { topCountries = []; }
  }

  // ISO-3166 alpha-2 → flag emoji
  const flag = (c?: string | null) => (c && c.length === 2 ? String.fromCodePoint(...[...c.toUpperCase()].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65)) : "🌐");

  const totalFor = (t: string) => totals.find((x) => x.type === t)?.count ?? 0;
  const maxDay = Math.max(1, ...last14.map((d) => d.count));

  return (
    <div className="pb-10">
      <PageHeader title="Analytics" subtitle="Live, on-site activity — real events from your visitors." />

      {!hasDb && <Card><EmptyState>Connect Postgres to start collecting on-site events.</EmptyState></Card>}
      {hasDb && !ok && <Card><p className="text-[13px] text-[#C0392B]">Could not read analytics.</p></Card>}

      {ok && (
        <>
          {/* real totals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <StatTile value={totalFor("page_view").toLocaleString()} label="Page views" sub={`${views14.toLocaleString()} in last 14 days`} />
            <StatTile value={totalFor("project_open").toLocaleString()} label="Project opens" sub="all time" />
            <StatTile value={totalFor("contact_submit").toLocaleString()} label="Form submissions" sub="all time" />
            <StatTile value={totalFor("cta_click").toLocaleString()} label="“Let’s chat” clicks" sub="all time" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <SectionCard title="Page views · last 14 days">
              {last14.length === 0 ? (
                <EmptyState>No views yet.</EmptyState>
              ) : (
                <div className="flex items-end gap-1.5 h-32">
                  {last14.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group">
                      <span className="text-[9px] text-[#14151A]/45 opacity-0 group-hover:opacity-100">{d.count}</span>
                      <div className="w-full rounded-t" style={{ height: `${Math.max(3, (d.count / maxDay) * 100)}%`, background: "linear-gradient(180deg, #2C2D33 0%, #55565E 100%)" }} title={`${d.day}: ${d.count}`} />
                      <span className="text-[8px] text-[#14151A]/40">{d.day.split(" ")[1]}</span>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard title="Most-opened projects">
              {topProjects.length === 0 ? (
                <EmptyState>No project opens yet.</EmptyState>
              ) : (
                <ul className="space-y-1.5">
                  {topProjects.map((p) => (
                    <li key={p.label} className="flex items-center justify-between text-[13px] py-1">
                      <span className="text-[#14151A]/75 truncate mr-3">{p.label}</span>
                      <span className="font-semibold text-[#14151A]">{p.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <SectionCard title="Top pages">
              {topPages.length === 0 ? (
                <EmptyState>No page views yet.</EmptyState>
              ) : (
                <ul className="space-y-1.5">
                  {topPages.map((p) => (
                    <li key={p.path} className="flex items-center justify-between text-[13px] py-1">
                      <span className="text-[#14151A]/75 truncate mr-3">{p.path || "/"}</span>
                      <span className="font-semibold text-[#14151A]">{p.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>

            <SectionCard title="Top locations">
              {topCountries.length === 0 ? (
                <EmptyState>No location data yet — collected on the live site.</EmptyState>
              ) : (
                <ul className="space-y-1.5">
                  {topCountries.map((c) => (
                    <li key={c.country} className="flex items-center justify-between text-[13px] py-1">
                      <span className="text-[#14151A]/75 mr-3">{flag(c.country)} {c.country}</span>
                      <span className="font-semibold text-[#14151A]">{c.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          </div>

          <SectionCard title="Recent activity">
            {recent.length === 0 ? (
              <EmptyState>No activity recorded yet.</EmptyState>
            ) : (
              <div className="space-y-1">
                {recent.map((e) => (
                  <div key={e.id} className="flex items-center gap-3 py-1.5">
                    <Badge tone={EVENT_TONE[e.type] || "neutral"}>{TYPE_LABELS[e.type] || e.type}</Badge>
                    <span className="text-[12px] text-[#14151A]/65 flex-1 min-w-0 truncate">{e.label || e.path || "—"}</span>
                    <span className="text-[11px] text-[#14151A]/35 shrink-0">{timeAgo(e.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </>
      )}
    </div>
  );
}
