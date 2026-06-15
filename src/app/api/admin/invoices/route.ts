import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { listInvoices, createInvoice, nextSeq, getSettings } from "@/lib/invoice/store";
import { blankInvoice } from "@/lib/invoice/defaults";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await listInvoices(), { headers: { "Cache-Control": "no-store" } });
}

/** Create an invoice. With no body, creates a fresh blank one with the next number. */
export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const settings = await getSettings();
  const seq = await nextSeq();
  const base = blankInvoice(seq, settings);
  const inv = await createInvoice({ ...base, ...body });
  return NextResponse.json(inv);
}
