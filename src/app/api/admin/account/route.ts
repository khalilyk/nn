import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { getAccount, saveAccount } from "@/lib/auth/account";
import { hasDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const acct = await getAccount();
  return NextResponse.json({ email: acct?.email ?? "", hasDb }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!hasDb) return NextResponse.json({ error: "Database not connected — connect Postgres to save account changes." }, { status: 400 });
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || typeof email !== "string") return NextResponse.json({ error: "Email required" }, { status: 400 });
  if (password && (typeof password !== "string" || password.length < 6)) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }
  try {
    await saveAccount(email, password || undefined);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Save failed", detail: String(e) }, { status: 500 });
  }
}
