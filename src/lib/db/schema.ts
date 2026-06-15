import { pgTable, serial, jsonb, timestamp, text, boolean, integer, doublePrecision } from "drizzle-orm/pg-core";
import type { SiteContent } from "@/lib/content/types";
import type { InvoiceItem, InvoiceSettings as InvoiceSettingsT } from "@/lib/invoice/types";

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

// ── Invoicing + CRM ──

/** CRM client records. */
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").default("").notNull(),
  email: text("email").default("").notNull(),
  phone: text("phone").default("").notNull(),
  address: text("address").default("").notNull(),
  abn: text("abn").default("").notNull(),
  notes: text("notes").default("").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ClientRow = typeof clients.$inferSelect;

/** Invoices, quotes, and recurring templates. */
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  number: text("number").notNull(),
  docType: text("doc_type").default("invoice").notNull(), // invoice | quote
  status: text("status").default("draft").notNull(), // draft | sent | paid | overdue
  clientId: integer("client_id"),
  client: jsonb("client").$type<{ name: string; company: string; email: string; address: string; abn: string }>().notNull(),
  subject: text("subject").default("").notNull(),
  issueDate: text("issue_date").default("").notNull(),
  dueDate: text("due_date").default("").notNull(),
  items: jsonb("items").$type<InvoiceItem[]>().notNull(),
  taxRate: doublePrecision("tax_rate").default(0).notNull(),
  taxLabel: text("tax_label").default("GST 10%").notNull(),
  discount: doublePrecision("discount").default(0).notNull(),
  currency: text("currency").default("AUD").notNull(),
  notes: text("notes").default("").notNull(),
  isTemplate: boolean("is_template").default(false).notNull(),
  recurInterval: text("recur_interval"), // weekly | fortnightly | monthly | quarterly | yearly
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InvoiceRow = typeof invoices.$inferSelect;

/** Single-row company/payment settings printed on every invoice. */
export const invoiceSettings = pgTable("invoice_settings", {
  id: serial("id").primaryKey(),
  data: jsonb("data").$type<InvoiceSettingsT>().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
