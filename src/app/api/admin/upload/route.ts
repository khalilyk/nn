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
  const blob = await put(file.name, file, { access: "public", addRandomSuffix: true });
  return NextResponse.json({ url: blob.url });
}
