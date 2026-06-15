import { desc } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { DEFAULT_CONTENT } from "./defaults";
import type { SiteContent } from "./types";

/** Latest published content, or the built-in defaults if the DB is empty/absent.
 *  Never throws — a missing/broken DB just falls back to defaults so the site
 *  always renders. */
export async function getSiteContent(): Promise<SiteContent> {
  if (!hasDb) return DEFAULT_CONTENT;
  try {
    const rows = await db
      .select()
      .from(siteContent)
      .orderBy(desc(siteContent.id))
      .limit(1);
    return rows[0]?.content ?? DEFAULT_CONTENT;
  } catch {
    return DEFAULT_CONTENT;
  }
}
