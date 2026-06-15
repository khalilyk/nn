import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteContent } from "@/lib/content/get";
import { saveSiteContent } from "@/lib/content/save";
import { isAuthed } from "@/lib/auth/session";
import type { SiteContent } from "@/lib/content/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const content = await getSiteContent();
  return NextResponse.json(content, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let content: SiteContent;
  try {
    content = (await req.json()) as SiteContent;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  if (!content || typeof content !== "object" || !content.hero || !content.menu) {
    return NextResponse.json({ error: "invalid content" }, { status: 400 });
  }
  try {
    const id = await saveSiteContent(content);
    revalidatePath("/");
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ error: "save failed", detail: String(e) }, { status: 500 });
  }
}
