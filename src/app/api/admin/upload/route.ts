import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthed } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "blob not configured" }, { status: 500 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no file" }, { status: 400 });
  }
  // Only allow real raster images — block SVG (can carry script) and arbitrary files.
  const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
  const MAX_BYTES = 10 * 1024 * 1024; // 10MB
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "unsupported file type" }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file too large (max 10MB)" }, { status: 413 });
  }
  const blob = await put(file.name, file, { access: "public", addRandomSuffix: true });
  return NextResponse.json({ url: blob.url });
}
