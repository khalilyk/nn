import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db, hasDb } from "@/lib/db";
import { passkeys } from "@/lib/db/schema";

export const RP_NAME = "Not Normal";
const CHALLENGE_COOKIE = "nn_wa_chal";

/** Relying-Party id (registrable domain, no scheme/port) + expected origin,
 *  derived from the incoming request so it works on localhost and prod alike. */
export function rpFromRequest(req: Request): { rpID: string; origin: string } {
  const host = req.headers.get("host") || "localhost:3009";
  const proto = req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const rpID = host.split(":")[0];
  return { rpID, origin: `${proto}://${host}` };
}

export async function setChallenge(challenge: string) {
  const jar = await cookies();
  jar.set(CHALLENGE_COOKIE, challenge, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 300, // 5 minutes, single ceremony
  });
}
export async function takeChallenge(): Promise<string | undefined> {
  const jar = await cookies();
  const v = jar.get(CHALLENGE_COOKIE)?.value;
  jar.delete(CHALLENGE_COOKIE);
  return v;
}

export type StoredPasskey = {
  id: number;
  credentialId: string;
  publicKey: string;
  counter: number;
  transports: string | null;
  label: string;
};

export async function listPasskeys(): Promise<StoredPasskey[]> {
  if (!hasDb) return [];
  return db.select().from(passkeys).orderBy(passkeys.id) as Promise<StoredPasskey[]>;
}

export async function getByCredentialId(credentialId: string): Promise<StoredPasskey | null> {
  if (!hasDb) return null;
  const [row] = await db.select().from(passkeys).where(eq(passkeys.credentialId, credentialId)).limit(1);
  return (row as StoredPasskey) ?? null;
}

export async function savePasskey(p: { credentialId: string; publicKey: string; counter: number; transports?: string; label?: string }) {
  await db.insert(passkeys).values({
    credentialId: p.credentialId,
    publicKey: p.publicKey,
    counter: p.counter,
    transports: p.transports ?? null,
    label: p.label ?? "Passkey",
  });
}

export async function bumpCounter(credentialId: string, counter: number) {
  await db.update(passkeys).set({ counter }).where(eq(passkeys.credentialId, credentialId));
}

export async function deletePasskey(id: number) {
  await db.delete(passkeys).where(eq(passkeys.id, id));
}
