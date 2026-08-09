import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { updateMember, deleteMember } from "@/lib/team/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const n = Number((await params).id);
  if (!Number.isFinite(n)) return NextResponse.json({ error: "bad id" }, { status: 400 });
  const body = await req.json().catch(() => ({}));
  const row = await updateMember(n, body);
  if (!row) return NextResponse.json({ error: "update failed" }, { status: 500 });
  return NextResponse.json(row);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const n = Number((await params).id);
  if (!Number.isFinite(n)) return NextResponse.json({ error: "bad id" }, { status: 400 });
  await deleteMember(n);
  return NextResponse.json({ ok: true });
}
