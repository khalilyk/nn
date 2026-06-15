import { desc, sql } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { events } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  page_view: "Page views",
  project_open: "Project opens",
  note_open: "Note opens",
  contact_submit: "Form submissions",
  cta_click: "“Let’s chat” clicks",
};

export default async function AnalyticsPage() {
  let ok = false;
  let totals: { type: string; count: number }[] = [];
  let topProjects: { label: string; count: number }[] = [];
  let recent: (typeof events.$inferSelect)[] = [];
  let last14: { day: string; count: number }[] = [];

  if (hasDb) {
    try {
      totals = (await db
        .select({ type: events.type, count: sql<number>`count(*)::int` })
        .from(events)
        .groupBy(events.type)) as { type: string; count: number }[];
      topProjects = (await db
        .select({ label: events.label, count: sql<number>`count(*)::int` })
        .from(events)
        .where(sql`${events.type} = 'project_open' and ${events.label} is not null`)
        .groupBy(events.label)
        .orderBy(desc(sql`count(*)`))
        .limit(8)) as { label: string; count: number }[];
      last14 = (await db
        .select({ day: sql<string>`to_char(${events.createdAt}, 'Mon DD')`, count: sql<number>`count(*)::int` })
        .from(events)
        .where(sql`${events.type} = 'page_view' and ${events.createdAt} > now() - interval '14 days'`)
        .groupBy(sql`to_char(${events.createdAt}, 'Mon DD'), date_trunc('day', ${events.createdAt})`)
        .orderBy(sql`date_trunc('day', ${events.createdAt})`)) as { day: string; count: number }[];
      recent = await db.select().from(events).orderBy(desc(events.createdAt)).limit(40);
      ok = true;
    } catch {
      ok = false;
    }
  }

  const totalFor = (t: string) => totals.find((x) => x.type === t)?.count ?? 0;
  const cards = ["page_view", "project_open", "contact_submit", "cta_click"];
  const maxDay = Math.max(1, ...last14.map((d) => d.count));

  return (
    <div className="pb-10">
      <h1 className="text-[22px] font-semibold text-[#0A0A0A] mb-1">Analytics</h1>
      <p className="text-[13px] text-[#0A0A0A]/50 mb-6">Live activity on the site.</p>

      {!hasDb && <p className="text-[13px] text-[#0A0A0A]/50">Connect Postgres to start collecting analytics.</p>}
      {hasDb && !ok && <p className="text-[13px] text-[#c0392b]">Could not read analytics.</p>}

      {ok && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
            {cards.map((t, i) => (
              <div key={t} className={`rounded-2xl p-4 ${i === 0 ? "bg-[#F4C84B]" : "bg-white/70"}`}>
                <div className="text-[28px] font-semibold leading-none text-[#0A0A0A]">{totalFor(t)}</div>
                <div className="mt-2 text-[11px] tracking-[0.12em] uppercase text-[#0A0A0A]/55">{TYPE_LABELS[t]}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* page views chart */}
            <div className="rounded-3xl bg-white/70 p-5">
              <h2 className="text-[13px] font-semibold mb-4 text-[#0A0A0A]">Page views · last 14 days</h2>
              {last14.length === 0 ? (
                <p className="text-[12px] text-[#0A0A0A]/45">No views yet.</p>
              ) : (
                <div className="flex items-end gap-1.5 h-32">
                  {last14.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t bg-[#1C1C1C]" style={{ height: `${(d.count / maxDay) * 100}%` }} title={`${d.day}: ${d.count}`} />
                      <span className="text-[8px] text-[#0A0A0A]/40 rotate-0">{d.day.split(" ")[1]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* top projects */}
            <div className="rounded-3xl bg-white/70 p-5">
              <h2 className="text-[13px] font-semibold mb-4 text-[#0A0A0A]">Most-opened projects</h2>
              {topProjects.length === 0 ? (
                <p className="text-[12px] text-[#0A0A0A]/45">No project opens yet.</p>
              ) : (
                <ul className="space-y-2">
                  {topProjects.map((p) => (
                    <li key={p.label} className="flex items-center justify-between text-[13px]">
                      <span className="text-[#0A0A0A]/75">{p.label}</span>
                      <span className="font-semibold text-[#0A0A0A]">{p.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* recent events */}
          <div className="rounded-3xl bg-white/70 p-5 mt-3">
            <h2 className="text-[13px] font-semibold mb-3 text-[#0A0A0A]">Recent activity</h2>
            <div className="divide-y divide-black/5">
              {recent.map((e) => (
                <div key={e.id} className="flex items-center justify-between py-2 text-[12px]">
                  <span className="text-[#0A0A0A]/75">
                    {TYPE_LABELS[e.type] || e.type}{e.label ? ` · ${e.label}` : ""}
                  </span>
                  <span className="text-[#0A0A0A]/40">{new Date(e.createdAt).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
