import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { getInvoice, updateInvoice, deleteInvoice } from "@/lib/invoice/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const inv = await getInvoice(Number(id));
  if (!inv) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(inv, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await updateInvoice(Number(id), body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await deleteInvoice(Number(id));
  return NextResponse.json({ ok: true });
}
