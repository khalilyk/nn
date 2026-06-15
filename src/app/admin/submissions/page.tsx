import { desc } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { submissions } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  let rows: (typeof submissions.$inferSelect)[] = [];
  let dbError = false;
  if (hasDb) {
    try {
      rows = await db.select().from(submissions).orderBy(desc(submissions.createdAt)).limit(200);
    } catch {
      dbError = true;
    }
  }

  return (
    <>
      <h1 className="text-[22px] font-bold mb-1">Submissions</h1>
      <p className="text-[13px] text-black/50 mb-6">Everyone who filled in the contact form.</p>

      {!hasDb && <p className="text-[13px] text-black/50">Database not connected yet — submissions appear here once Postgres is set up.</p>}
      {dbError && <p className="text-[13px] text-[#c0392b]">Could not read submissions.</p>}
      {hasDb && !dbError && rows.length === 0 && <p className="text-[13px] text-black/50">No submissions yet.</p>}

      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl bg-white shadow-sm p-4">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-baseline gap-3">
                <span className="font-medium">{r.name}</span>
                <a href={`mailto:${r.email}`} className="text-[13px] text-black/55 hover:text-black underline">{r.email}</a>
              </div>
              <span className="text-[12px] text-black/40">{new Date(r.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-[14px] leading-relaxed text-black/80 whitespace-pre-wrap">{r.message}</p>
            {r.coffee && <p className="mt-2 text-[12px] text-black/50">Coffee: {r.coffee}</p>}
          </div>
        ))}
      </div>
    </>
  );
}
