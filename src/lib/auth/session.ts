import { cookies } from "next/headers";
import { signToken, verifyToken, SESSION_COOKIE } from "./jwt";

/** Sign a 7-day admin JWT and set it as an HttpOnly cookie. */
export async function createSession() {
  const token = await signToken();
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

/** Verify the session from the current request's cookies. */
export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(SESSION_COOKIE)?.value);
}

export { SESSION_COOKIE };
