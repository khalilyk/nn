import { desc } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { DEFAULT_CONTENT } from "./defaults";
import type { SiteContent } from "./types";

/** Latest published content, or the built-in defaults if the DB is empty/absent.
 *  Never throws — a missing/broken DB just falls back to defaults so the site
 *  always renders. */
export async function getSiteContent(): Promise<SiteContent> {
  if (!hasDb) return normalize(DEFAULT_CONTENT);
  try {
    const rows = await db
      .select()
      .from(siteContent)
      .orderBy(desc(siteContent.id))
      .limit(1);
    return normalize(rows[0]?.content ?? DEFAULT_CONTENT);
  } catch {
    return normalize(DEFAULT_CONTENT);
  }
}

/** Backfill newer fields on older saved content so the editor/site stay consistent. */
function normalize(c: SiteContent): SiteContent {
  return {
    ...c,
    brands: { ...DEFAULT_CONTENT.brands, ...(((c as unknown as Record<string, unknown>).brands ?? (c as unknown as Record<string, unknown>).clients ?? {}) as object) },
    seo: { ...DEFAULT_CONTENT.seo, ...(c.seo ?? {}) },
    projects: (c.projects ?? []).map((p) => ({
      ...p,
      images: p.images && p.images.length ? p.images : (p.img ? [p.img] : []),
    })),
  };
}
