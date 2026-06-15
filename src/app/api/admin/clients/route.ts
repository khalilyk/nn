import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { listClients, createClient } from "@/lib/invoice/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await listClients(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const client = await createClient(body);
  return NextResponse.json(client);
}
