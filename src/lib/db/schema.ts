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

/** Lightweight analytics events. */
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // page_view | project_open | note_open | contact_submit | cta_click
  label: text("label"), // e.g. project name, path
  path: text("path"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type EventRow = typeof events.$inferSelect;

/** Single admin account (editable email + password). Falls back to env if absent. */
export const adminUser = pgTable("admin_user", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
