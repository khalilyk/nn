import { NextResponse } from "next/server";
import { db, hasDb } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { isAuthed } from "@/lib/auth/session";

export const runtime = "nodejs";

const ALLOWED = new Set(["page_view", "project_open", "note_open", "contact_submit", "cta_click"]);

export async function POST(req: Request) {
  if (!hasDb) return NextResponse.json({ ok: false });
  // never record the studio's own activity: a logged-in admin, or admin/login pages
  if (await isAuthed().catch(() => false)) return NextResponse.json({ ok: true, skipped: "admin" });
  try {
    const { type, label, path } = await req.json();
    if (typeof path === "string" && (path.startsWith("/admin") || path.startsWith("/login"))) {
      return NextResponse.json({ ok: true, skipped: "admin-path" });
    }
    if (!ALLOWED.has(type)) return NextResponse.json({ ok: false }, { status: 400 });
    const base = {
      type,
      label: typeof label === "string" ? label.slice(0, 200) : null,
      path: typeof path === "string" ? path.slice(0, 200) : null,
    };
    const country = (req.headers.get("x-vercel-ip-country") || "").slice(0, 2).toUpperCase() || null;
    try {
      await db.insert(events).values({ ...base, country });
    } catch {
      // `country` column may not be migrated yet — record without it
      await db.insert(events).values(base);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
