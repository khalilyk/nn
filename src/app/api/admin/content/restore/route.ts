import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed } from "@/lib/auth/session";
import { restoreVersion } from "@/lib/content/history";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await req.json().catch(() => ({ id: NaN }));
  const n = Number(id);
  if (!Number.isFinite(n)) return NextResponse.json({ error: "bad id" }, { status: 400 });
  const newId = await restoreVersion(n);
  if (!newId) return NextResponse.json({ error: "version not found" }, { status: 404 });
  revalidatePath("/");
  return NextResponse.json({ ok: true, id: newId });
}
