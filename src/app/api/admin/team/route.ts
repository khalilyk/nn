import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth/session";
import { listMembers, createMember } from "@/lib/team/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await listMembers(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body || !body.name || typeof body.name !== "string") return NextResponse.json({ error: "Name required" }, { status: 400 });
  const member = await createMember(body);
  if (!member) return NextResponse.json({ error: "Could not add member (is the team_members table migrated?)" }, { status: 500 });
  return NextResponse.json(member);
}
