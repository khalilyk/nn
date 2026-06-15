import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { listProposals, createProposal } from "@/lib/proposal/store";
import { blankProposal } from "@/lib/proposal/templates";
import type { ProposalKind } from "@/lib/proposal/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await listProposals(), { headers: { "Cache-Control": "no-store" } });
}

/** Create a proposal. Body may supply { kind } to seed from a template, or a full proposal. */
export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const kind: ProposalKind = body.kind || "website";
  const base = blankProposal(kind);
  const created = await createProposal({ ...base, ...(body.slides ? body : {}) });
  return NextResponse.json(created);
}
