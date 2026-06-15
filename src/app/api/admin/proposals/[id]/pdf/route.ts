import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { getProposal } from "@/lib/proposal/store";
import { renderProposalPdf } from "@/lib/proposal/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const p = await getProposal(Number(id));
  if (!p) return NextResponse.json({ error: "not found" }, { status: 404 });

  const origin = new URL(req.url).origin;
  const pdf = await renderProposalPdf(p, origin);

  const inline = new URL(req.url).searchParams.get("inline") === "1";
  const name = `${p.title.replace(/\s+/g, "-").toLowerCase()}.pdf`;
  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${name}"`,
      "Cache-Control": "no-store",
    },
  });
}
