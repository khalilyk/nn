import { NextResponse } from "next/server";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import type { AuthenticatorTransportFuture } from "@simplewebauthn/server";
import { isAuthed } from "@/lib/auth/session";
import { RP_NAME, rpFromRequest, setChallenge, listPasskeys } from "@/lib/auth/webauthn";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { rpID } = rpFromRequest(req);
  const existing = await listPasskeys();
  const options = await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID,
    userName: "admin",
    attestationType: "none",
    excludeCredentials: existing.map((p) => ({
      id: p.credentialId,
      transports: (p.transports?.split(",") as AuthenticatorTransportFuture[]) || undefined,
    })),
    authenticatorSelection: { residentKey: "preferred", userVerification: "preferred" },
  });
  await setChallenge(options.challenge);
  return NextResponse.json(options);
}
