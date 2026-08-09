import { desc, eq } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { teamMembers, type TeamMemberRow } from "@/lib/db/schema";

export type TeamMember = TeamMemberRow;

const ROLES = ["owner", "admin", "editor"] as const;
const STATUSES = ["active", "invited"] as const;
type Role = (typeof ROLES)[number];
type Status = (typeof STATUSES)[number];

const cleanRole = (r: unknown): Role => (ROLES.includes(r as Role) ? (r as Role) : "editor");
const cleanStatus = (s: unknown): Status => (STATUSES.includes(s as Status) ? (s as Status) : "active");

/** All team members, newest last. Never throws — a missing table/DB yields []. */
export async function listMembers(): Promise<TeamMember[]> {
  if (!hasDb) return [];
  try {
    return await db.select().from(teamMembers).orderBy(desc(teamMembers.createdAt));
  } catch {
    return [];
  }
}

export async function createMember(input: { name: string; email?: string; role?: string; status?: string }): Promise<TeamMember | null> {
  if (!hasDb) return null;
  try {
    const [row] = await db
      .insert(teamMembers)
      .values({ name: input.name.trim(), email: (input.email || "").trim(), role: cleanRole(input.role), status: cleanStatus(input.status) })
      .returning();
    return row;
  } catch {
    return null;
  }
}

export async function updateMember(id: number, patch: Partial<{ name: string; email: string; role: string; status: string }>): Promise<TeamMember | null> {
  if (!hasDb) return null;
  try {
    const data: Record<string, unknown> = {};
    if (patch.name !== undefined) data.name = patch.name.trim();
    if (patch.email !== undefined) data.email = patch.email.trim();
    if (patch.role !== undefined) data.role = cleanRole(patch.role);
    if (patch.status !== undefined) data.status = cleanStatus(patch.status);
    const [row] = await db.update(teamMembers).set(data).where(eq(teamMembers.id, id)).returning();
    return row ?? null;
  } catch {
    return null;
  }
}

export async function deleteMember(id: number): Promise<boolean> {
  if (!hasDb) return false;
  try {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return true;
  } catch {
    return false;
  }
}
