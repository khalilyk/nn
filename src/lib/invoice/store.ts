import { desc, eq, sql } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { clients, invoices, invoiceSettings } from "@/lib/db/schema";
import type { Client, Invoice, InvoiceSettings } from "./types";
import { DEFAULT_SETTINGS } from "./defaults";

// ── settings (single row) ──

export async function getSettings(): Promise<InvoiceSettings> {
  if (!hasDb) return DEFAULT_SETTINGS;
  try {
    const [row] = await db.select().from(invoiceSettings).orderBy(desc(invoiceSettings.id)).limit(1);
    return row ? { ...DEFAULT_SETTINGS, ...row.data } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(data: InvoiceSettings): Promise<void> {
  const [row] = await db.select().from(invoiceSettings).orderBy(desc(invoiceSettings.id)).limit(1);
  if (row) {
    await db.update(invoiceSettings).set({ data, updatedAt: new Date() }).where(eq(invoiceSettings.id, row.id));
  } else {
    await db.insert(invoiceSettings).values({ data });
  }
}

// ── clients ──

export async function listClients(): Promise<Client[]> {
  if (!hasDb) return [];
  const rows = await db.select().from(clients).orderBy(desc(clients.createdAt));
  return rows.map(toClient);
}

export async function getClient(id: number): Promise<Client | null> {
  if (!hasDb) return null;
  const [row] = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
  return row ? toClient(row) : null;
}

export async function createClient(c: Partial<Client>): Promise<Client> {
  const [row] = await db.insert(clients).values({
    name: c.name || "Unnamed", company: c.company || "", email: c.email || "",
    phone: c.phone || "", address: c.address || "", abn: c.abn || "", notes: c.notes || "",
  }).returning();
  return toClient(row);
}

export async function updateClient(id: number, c: Partial<Client>): Promise<void> {
  await db.update(clients).set({
    name: c.name, company: c.company, email: c.email,
    phone: c.phone, address: c.address, abn: c.abn, notes: c.notes,
  }).where(eq(clients.id, id));
}

export async function deleteClient(id: number): Promise<void> {
  await db.delete(clients).where(eq(clients.id, id));
}

// ── invoices ──

export async function listInvoices(): Promise<Invoice[]> {
  if (!hasDb) return [];
  const rows = await db.select().from(invoices).orderBy(desc(invoices.createdAt));
  return rows.map(toInvoice);
}

export async function getInvoice(id: number): Promise<Invoice | null> {
  if (!hasDb) return null;
  const [row] = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  return row ? toInvoice(row) : null;
}

/** Next sequential invoice number, based on the highest existing count. */
export async function nextSeq(): Promise<number> {
  if (!hasDb) return 1001;
  const [r] = await db.select({ c: sql<number>`count(*)::int` }).from(invoices);
  return 1001 + (r?.c ?? 0);
}

export async function createInvoice(inv: Omit<Invoice, "id" | "createdAt" | "updatedAt">): Promise<Invoice> {
  const [row] = await db.insert(invoices).values({
    number: inv.number, docType: inv.docType, status: inv.status, clientId: inv.clientId,
    client: inv.client, subject: inv.subject, issueDate: inv.issueDate, dueDate: inv.dueDate,
    items: inv.items, taxRate: inv.taxRate, taxLabel: inv.taxLabel, discount: inv.discount,
    currency: inv.currency, notes: inv.notes, isTemplate: inv.isTemplate, recurInterval: inv.recurInterval,
  }).returning();
  return toInvoice(row);
}

export async function updateInvoice(id: number, inv: Partial<Invoice>): Promise<void> {
  await db.update(invoices).set({
    number: inv.number, docType: inv.docType, status: inv.status, clientId: inv.clientId,
    client: inv.client, subject: inv.subject, issueDate: inv.issueDate, dueDate: inv.dueDate,
    items: inv.items, taxRate: inv.taxRate, taxLabel: inv.taxLabel, discount: inv.discount,
    currency: inv.currency, notes: inv.notes, isTemplate: inv.isTemplate, recurInterval: inv.recurInterval,
    updatedAt: new Date(),
  }).where(eq(invoices.id, id));
}

export async function deleteInvoice(id: number): Promise<void> {
  await db.delete(invoices).where(eq(invoices.id, id));
}

// ── row → type mappers ──

function toClient(r: typeof clients.$inferSelect): Client {
  return {
    id: r.id, name: r.name, company: r.company, email: r.email, phone: r.phone,
    address: r.address, abn: r.abn, notes: r.notes, createdAt: r.createdAt.toISOString(),
  };
}

function toInvoice(r: typeof invoices.$inferSelect): Invoice {
  return {
    id: r.id, number: r.number, docType: r.docType as Invoice["docType"], status: r.status as Invoice["status"],
    clientId: r.clientId, client: r.client, subject: r.subject, issueDate: r.issueDate, dueDate: r.dueDate,
    items: r.items, taxRate: r.taxRate, taxLabel: r.taxLabel, discount: r.discount, currency: r.currency,
    notes: r.notes, isTemplate: r.isTemplate, recurInterval: r.recurInterval as Invoice["recurInterval"],
    createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString(),
  };
}
