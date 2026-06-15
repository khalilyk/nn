import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAuthed } from "@/lib/auth/session";
import { getProposal } from "@/lib/proposal/store";
import { renderProposalPdf } from "@/lib/proposal/pdf";
import { fetchLogoDataUri } from "@/lib/invoice/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM = process.env.CONTACT_FROM || "Not Normal <onboarding@resend.dev>";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const p = await getProposal(Number(id));
  if (!p) return NextResponse.json({ error: "not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const to: string = (body.to || p.client.email || "").trim();
  if (!to) return NextResponse.json({ error: "No client email." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Email service not configured." }, { status: 500 });

  const origin = new URL(req.url).origin;
  const [wordmark, smiley] = await Promise.all([
    fetchLogoDataUri("/notnormal-logoblack.png", origin),
    fetchLogoDataUri("/notnormal-iconoutline.png", origin),
  ]);
  const pdf = await renderProposalPdf(p, wordmark, smiley);
  const filename = `${p.title.replace(/\s+/g, "-").toLowerCase()}.pdf`;

  const subject = (body.subject || `${p.title} — Not Normal`).trim();
  const text = (body.message || `Hi ${p.client.name || "there"},\n\nPlease find attached our ${p.title.toLowerCase()}.\n\nLooking forward to your thoughts.\n\nNot Normal`).trim();

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM, to, replyTo: "hello@thisisnn.com", subject, text,
    attachments: [{ filename, content: pdf }],
  });
  if (error) return NextResponse.json({ error: error.message || "Failed to send." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
