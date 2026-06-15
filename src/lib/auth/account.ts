import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { db, hasDb } from "@/lib/db";
import { adminUser } from "@/lib/db/schema";

export function hashPassword(pw: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyHash(pw: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const a = Buffer.from(hash, "hex");
  const b = scryptSync(pw, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** The stored admin account, or null if none saved (env fallback in use). */
export async function getAccount(): Promise<{ email: string } | null> {
  if (!hasDb) return null;
  try {
    const [row] = await db.select().from(adminUser).limit(1);
    return row ? { email: row.email } : null;
  } catch {
    return null;
  }
}

/** Validate a login password against the DB account, or the env password. */
export async function verifyLogin(pw: string): Promise<boolean> {
  if (hasDb) {
    try {
      const [row] = await db.select().from(adminUser).limit(1);
      if (row) return verifyHash(pw, row.passwordHash);
    } catch {
      /* fall through to env */
    }
  }
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const a = Buffer.from(pw);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Create/update the admin account. Password optional (keeps current if omitted). */
export async function saveAccount(email: string, password?: string): Promise<void> {
  const [row] = await db.select().from(adminUser).limit(1);
  if (row) {
    await db
      .update(adminUser)
      .set({ email, ...(password ? { passwordHash: hashPassword(password) } : {}), updatedAt: new Date() })
      .where(eqId(row.id));
  } else {
    await db.insert(adminUser).values({
      email,
      passwordHash: hashPassword(password || process.env.ADMIN_PASSWORD || "changeme"),
    });
  }
}

import { eq } from "drizzle-orm";
function eqId(id: number) {
  return eq(adminUser.id, id);
}
