import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth/session";
import { verifyLogin } from "@/lib/auth/account";

export const runtime = "nodejs";

// Best-effort brute-force throttle. In-memory per server instance — meaningfully
// slows credential-stuffing without external infra. Lockout after MAX fails / window.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILS = 8;
const attempts = new Map<string, { fails: number; first: number }>();

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff ? xff.split(",")[0] : req.headers.get("x-real-ip") || "unknown").trim();
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && now - rec.first < WINDOW_MS && rec.fails >= MAX_FAILS) {
    const retry = Math.ceil((WINDOW_MS - (now - rec.first)) / 1000);
    return NextResponse.json({ error: "too many attempts" }, { status: 429, headers: { "Retry-After": String(retry) } });
  }

  const { password } = await req.json().catch(() => ({ password: "" }));
  if (typeof password !== "string" || !(await verifyLogin(password))) {
    const cur = rec && now - rec.first < WINDOW_MS ? rec : { fails: 0, first: now };
    cur.fails += 1;
    attempts.set(ip, cur);
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }

  attempts.delete(ip); // success clears the counter
  await createSession();
  return NextResponse.json({ ok: true });
}
