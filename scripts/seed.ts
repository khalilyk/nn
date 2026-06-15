import { db } from "../src/lib/db";
import { siteContent } from "../src/lib/db/schema";
import { DEFAULT_CONTENT } from "../src/lib/content/defaults";

/** Idempotent seed: only inserts defaults if the table is empty. */
async function main() {
  const existing = await db.select().from(siteContent).limit(1);
  if (existing.length) {
    console.log("site_content already has rows — skipping seed.");
    return;
  }
  await db.insert(siteContent).values({ content: DEFAULT_CONTENT });
  console.log("Seeded site_content with defaults.");
}

main().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
