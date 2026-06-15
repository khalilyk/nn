import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAuthed } from "@/lib/auth/session";
import { getInvoice, getSettings, updateInvoice } from "@/lib/invoice/store";
import { renderInvoicePdf, fetchLogoDataUri } from "@/lib/invoice/pdf";
import { computeTotals, money } from "@/lib/invoice/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM = process.env.CONTACT_FROM || "Not Normal <onboarding@resend.dev>";

function fill(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const inv = await getInvoice(Number(id));
  if (!inv) return NextResponse.json({ error: "not found" }, { status: 404 });
  const cfg = await getSettings();

  const body = await req.json().catch(() => ({}));
  const to: string = (body.to || inv.client.email || "").trim();
  if (!to) return NextResponse.json({ error: "No client email." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Email service not configured." }, { status: 500 });

  const t = computeTotals(inv);
  const vars = {
    number: inv.number,
    client: inv.client.name || "there",
    subject: inv.subject || (inv.docType === "quote" ? "your quote" : "your invoice"),
    total: `${money(t.total)} ${inv.currency}`,
    due: inv.dueDate || "the due date",
    company: cfg.companyName,
  };
  const subject = fill(body.subject || cfg.emailSubject, vars);
  const text = fill(body.message || cfg.emailBody, vars);

  const origin = new URL(req.url).origin;
  const logo = await fetchLogoDataUri(cfg.logoUrl, origin);
  const pdf = await renderInvoicePdf(inv, cfg, logo);
  const filename = `${inv.docType}-${inv.number.replace("#", "")}.pdf`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: cfg.email || undefined,
    subject,
    text,
    attachments: [{ filename, content: pdf }],
  });
  if (error) return NextResponse.json({ error: error.message || "Failed to send." }, { status: 502 });

  if (inv.status === "draft") await updateInvoice(inv.id, { status: "sent" });
  return NextResponse.json({ ok: true });
}
