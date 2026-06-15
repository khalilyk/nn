import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { getInvoice, getSettings } from "@/lib/invoice/store";
import { renderInvoicePdf } from "@/lib/invoice/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const inv = await getInvoice(Number(id));
  if (!inv) return NextResponse.json({ error: "not found" }, { status: 404 });
  const cfg = await getSettings();
  const pdf = await renderInvoicePdf(inv, cfg);

  const inline = new URL(req.url).searchParams.get("inline") === "1";
  const name = `${inv.docType}-${inv.number.replace("#", "")}.pdf`;
  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${name}"`,
      "Cache-Control": "no-store",
    },
  });
}
