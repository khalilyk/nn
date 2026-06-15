import { desc, eq } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { proposals } from "@/lib/db/schema";
import type { Proposal } from "./types";

export async function listProposals(): Promise<Proposal[]> {
  if (!hasDb) return [];
  const rows = await db.select().from(proposals).orderBy(desc(proposals.createdAt));
  return rows.map(toProposal);
}

export async function getProposal(id: number): Promise<Proposal | null> {
  if (!hasDb) return null;
  const [row] = await db.select().from(proposals).where(eq(proposals.id, id)).limit(1);
  return row ? toProposal(row) : null;
}

export async function createProposal(p: Omit<Proposal, "id" | "createdAt" | "updatedAt">): Promise<Proposal> {
  const [row] = await db.insert(proposals).values({
    title: p.title, kind: p.kind, clientTag: p.clientTag, client: p.client, slides: p.slides,
  }).returning();
  return toProposal(row);
}

export async function updateProposal(id: number, p: Partial<Proposal>): Promise<void> {
  await db.update(proposals).set({
    title: p.title, kind: p.kind, clientTag: p.clientTag, client: p.client, slides: p.slides,
    updatedAt: new Date(),
  }).where(eq(proposals.id, id));
}

export async function deleteProposal(id: number): Promise<void> {
  await db.delete(proposals).where(eq(proposals.id, id));
}

function toProposal(r: typeof proposals.$inferSelect): Proposal {
  return {
    id: r.id, title: r.title, kind: r.kind as Proposal["kind"], clientTag: r.clientTag,
    client: r.client, slides: r.slides,
    createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString(),
  };
}
