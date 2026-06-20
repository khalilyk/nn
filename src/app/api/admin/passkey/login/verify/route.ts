import { NextResponse } from "next/server";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import type { AuthenticationResponseJSON, AuthenticatorTransportFuture } from "@simplewebauthn/server";
import { createSession } from "@/lib/auth/session";
import { rpFromRequest, takeChallenge, getByCredentialId, bumpCounter } from "@/lib/auth/webauthn";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as AuthenticationResponseJSON | null;
  if (!body?.id) return NextResponse.json({ error: "invalid body" }, { status: 400 });

  const { rpID, origin } = rpFromRequest(req);
  const expectedChallenge = await takeChallenge();
  if (!expectedChallenge) return NextResponse.json({ error: "challenge expired" }, { status: 400 });

  const stored = await getByCredentialId(body.id);
  if (!stored) return NextResponse.json({ error: "unknown passkey" }, { status: 401 });

  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: stored.credentialId,
        publicKey: new Uint8Array(Buffer.from(stored.publicKey, "base64url")),
        counter: stored.counter,
        transports: (stored.transports?.split(",") as AuthenticatorTransportFuture[]) || undefined,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 401 });
  }
  if (!verification.verified) return NextResponse.json({ error: "not verified" }, { status: 401 });

  await bumpCounter(stored.credentialId, verification.authenticationInfo.newCounter);
  await createSession();
  return NextResponse.json({ ok: true });
}
