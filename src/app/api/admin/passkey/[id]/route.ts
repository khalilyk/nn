import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { deletePasskey } from "@/lib/auth/webauthn";

export const runtime = "nodejs";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const n = Number(id);
  if (!Number.isFinite(n)) return NextResponse.json({ error: "bad id" }, { status: 400 });
  await deletePasskey(n);
  return NextResponse.json({ ok: true });
}
