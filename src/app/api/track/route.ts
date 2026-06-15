import { NextResponse } from "next/server";
import { db, hasDb } from "@/lib/db";
import { events } from "@/lib/db/schema";

export const runtime = "nodejs";

const ALLOWED = new Set(["page_view", "project_open", "note_open", "contact_submit", "cta_click"]);

export async function POST(req: Request) {
  if (!hasDb) return NextResponse.json({ ok: false });
  try {
    const { type, label, path } = await req.json();
    if (!ALLOWED.has(type)) return NextResponse.json({ ok: false }, { status: 400 });
    await db.insert(events).values({
      type,
      label: typeof label === "string" ? label.slice(0, 200) : null,
      path: typeof path === "string" ? path.slice(0, 200) : null,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
