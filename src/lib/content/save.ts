import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import type { SiteContent } from "./types";

/** Insert a new version row (latest wins). Returns the new row id. */
export async function saveSiteContent(content: SiteContent): Promise<number> {
  const [row] = await db
    .insert(siteContent)
    .values({ content })
    .returning({ id: siteContent.id });
  return row.id;
}
