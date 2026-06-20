import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { listVersions } from "@/lib/content/history";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const versions = await listVersions();
  return NextResponse.json(versions, { headers: { "Cache-Control": "no-store" } });
}
