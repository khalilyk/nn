import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth/session";

export const runtime = "nodejs";

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || typeof password !== "string" || !safeEqual(password, expected)) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}
