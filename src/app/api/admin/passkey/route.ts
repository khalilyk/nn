import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { listPasskeys } from "@/lib/auth/webauthn";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const list = await listPasskeys();
  return NextResponse.json(
    list.map((p) => ({ id: p.id, label: p.label, createdAt: undefined })),
    { headers: { "Cache-Control": "no-store" } },
  );
}
