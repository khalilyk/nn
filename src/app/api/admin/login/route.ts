import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth/session";
import { verifyLogin } from "@/lib/auth/account";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (typeof password !== "string" || !(await verifyLogin(password))) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}
