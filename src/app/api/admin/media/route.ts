import { NextResponse } from "next/server";
import { list, del } from "@vercel/blob";
import { isAuthed } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ blobs: [] });
  const { blobs } = await list();
  const items = blobs
    .map((b) => ({ url: b.url, pathname: b.pathname, size: b.size, uploadedAt: b.uploadedAt }))
    .sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt));
  return NextResponse.json({ blobs: items }, { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { url } = await req.json().catch(() => ({ url: "" }));
  if (!url || typeof url !== "string") return NextResponse.json({ error: "no url" }, { status: 400 });
  await del(url);
  return NextResponse.json({ ok: true });
}
