import { NextResponse } from "next/server";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import type { AuthenticatorTransportFuture } from "@simplewebauthn/server";
import { rpFromRequest, setChallenge, listPasskeys } from "@/lib/auth/webauthn";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { rpID } = rpFromRequest(req);
  const existing = await listPasskeys();
  const options = await generateAuthenticationOptions({
    rpID,
    allowCredentials: existing.map((p) => ({
      id: p.credentialId,
      transports: (p.transports?.split(",") as AuthenticatorTransportFuture[]) || undefined,
    })),
    userVerification: "preferred",
  });
  await setChallenge(options.challenge);
  return NextResponse.json(options);
}
