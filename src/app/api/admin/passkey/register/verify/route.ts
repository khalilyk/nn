import { NextResponse } from "next/server";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import type { RegistrationResponseJSON } from "@simplewebauthn/server";
import { isAuthed } from "@/lib/auth/session";
import { rpFromRequest, takeChallenge, savePasskey } from "@/lib/auth/webauthn";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as (RegistrationResponseJSON & { label?: string }) | null;
  if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });

  const { rpID, origin } = rpFromRequest(req);
  const expectedChallenge = await takeChallenge();
  if (!expectedChallenge) return NextResponse.json({ error: "challenge expired" }, { status: 400 });

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
  if (!verification.verified || !verification.registrationInfo) {
    return NextResponse.json({ error: "not verified" }, { status: 400 });
  }

  const { credential } = verification.registrationInfo;
  await savePasskey({
    credentialId: credential.id,
    publicKey: Buffer.from(credential.publicKey).toString("base64url"),
    counter: credential.counter,
    transports: credential.transports?.join(","),
    label: typeof body.label === "string" && body.label.trim() ? body.label.trim() : "Passkey",
  });
  return NextResponse.json({ ok: true });
}
