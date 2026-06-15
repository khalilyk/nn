import { pgTable, serial, jsonb, timestamp, text, boolean } from "drizzle-orm/pg-core";
import type { SiteContent } from "@/lib/content/types";

/** The whole editable site, one row per published version (latest id wins). */
export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  content: jsonb("content").$type<SiteContent>().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Contact-form submissions, append-only. */
export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  coffee: text("coffee"),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SubmissionRow = typeof submissions.$inferSelect;
