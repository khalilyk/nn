import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { getSettings, saveSettings } from "@/lib/invoice/store";
import type { InvoiceSettings } from "@/lib/invoice/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await getSettings(), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await saveSettings(body as InvoiceSettings);
  return NextResponse.json({ ok: true });
}
