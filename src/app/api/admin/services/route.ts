import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { getCatalog, saveCatalog } from "@/lib/services/store";
import type { ServicesCatalog } from "@/lib/services/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await getCatalog(), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) return NextResponse.json({ error: "Expected a catalog array." }, { status: 400 });
  const ok = await saveCatalog(body as ServicesCatalog);
  if (!ok) return NextResponse.json({ error: "Save failed (is the services_catalog table migrated?)" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
