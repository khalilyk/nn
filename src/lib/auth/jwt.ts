import { SignJWT, jwtVerify } from "jose";

/** Edge-safe JWT helpers — no next/headers import, usable from proxy.ts. */

export const SESSION_COOKIE = "nn_session";

const secret = () => {
  const s = process.env.SESSION_SECRET;
  if (!s) {
    // Never sign/verify with a known secret in production — fail closed.
    if (process.env.NODE_ENV === "production") {
      throw new Error("SESSION_SECRET is not set");
    }
    return new TextEncoder().encode("dev-insecure-secret-change-me");
  }
  return new TextEncoder().encode(s);
};

export async function signToken(): Promise<string> {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.admin === true;
  } catch {
    return false;
  }
}
