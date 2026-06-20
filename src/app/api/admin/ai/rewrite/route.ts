import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { isAuthed } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INSTRUCTIONS: Record<string, string> = {
  grammar: "Fix any spelling and grammar mistakes. Keep the meaning, tone and length as close to the original as possible.",
  positive: "Rewrite in a warmer, more positive and confident tone, without exaggerating or adding new facts.",
  punchier: "Make it punchier and more concise — sharper, more impactful, fewer filler words. Keep the core meaning.",
  shorten: "Make it shorter and tighter while keeping the key message.",
};

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ error: "AI isn’t set up yet. Add ANTHROPIC_API_KEY in the project settings to enable rewrites." }, { status: 503 });

  const { text, action, label, context } = await req.json().catch(() => ({}));
  const isGenerate = action === "generate";

  if (!isGenerate && (typeof text !== "string" || !text.trim())) {
    return NextResponse.json({ error: "Nothing to rewrite." }, { status: 400 });
  }

  const fieldLabel = typeof label === "string" && label.trim() ? label.trim() : "field";
  const ctx = typeof context === "string" && context.trim() ? context.trim() : "";

  const userContent = isGenerate
    ? `Write the copy for the "${fieldLabel}" field.` +
      (ctx ? `\n\nContext about this item:\n${ctx}` : "") +
      (typeof text === "string" && text.trim() ? `\n\nCurrent draft to improve on:\n${text}` : "") +
      `\n\nReturn only the value for the field — concise and on-brand, no label or quotes.`
    : `Instruction: ${INSTRUCTIONS[action] || INSTRUCTIONS.grammar}\n\nText:\n${text}`;

  try {
    const client = new Anthropic({ apiKey: key });
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system:
        "You are a copywriting assistant for a premium hospitality branding studio's website. " +
        (isGenerate
          ? "Write short, confident, on-brand copy for the requested field using the context. Match the field's purpose (a tagline is a few words; a description a sentence or two). "
          : "Rewrite the user's text per the instruction. ") +
        "Return ONLY the text — no preamble, quotes, labels, or explanation. Preserve line breaks and any obvious formatting.",
      messages: [{ role: "user", content: userContent }],
    });
    const out = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("").trim();
    if (!out) return NextResponse.json({ error: "No rewrite returned." }, { status: 502 });
    return NextResponse.json({ text: out });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Rewrite failed." }, { status: 502 });
  }
}
