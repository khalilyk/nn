import { desc, eq } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import type { SiteContent } from "./types";

export type VersionMeta = { id: number; updatedAt: string };

/** Newest-first list of saved versions (metadata only — no content blob). */
export async function listVersions(limit = 60): Promise<VersionMeta[]> {
  if (!hasDb) return [];
  const rows = await db
    .select({ id: siteContent.id, updatedAt: siteContent.updatedAt })
    .from(siteContent)
    .orderBy(desc(siteContent.id))
    .limit(limit);
  return rows.map((r) => ({ id: r.id, updatedAt: r.updatedAt.toISOString() }));
}

/** Full content of one version, or null. */
export async function getVersion(id: number): Promise<SiteContent | null> {
  if (!hasDb) return null;
  const [row] = await db.select().from(siteContent).where(eq(siteContent.id, id)).limit(1);
  return (row?.content as SiteContent) ?? null;
}

/** Re-publish an older version's content as a brand-new version (non-destructive
 *  rollback). Returns the new row id, or null if the source version is missing. */
export async function restoreVersion(id: number): Promise<number | null> {
  if (!hasDb) return null;
  const content = await getVersion(id);
  if (!content) return null;
  const [row] = await db.insert(siteContent).values({ content }).returning({ id: siteContent.id });
  return row.id;
}
