/** Shared auth helper for the Pixelform gate (/pf). Cookie value is a SHA-256
 *  of the password, so the same value is computable in the edge proxy and the
 *  Node login route without shipping the password itself into the cookie. */
export const PF_COOKIE = "pf_auth";

// Real password lives in the PF_PASSWORD env var (Vercel). This fallback is only
// used if that var is ever unset — keep it a neutral placeholder, not the real one.
export const pfPassword = () => process.env.PF_PASSWORD || "pixelform";

export async function pfToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + "::pixelform-gate-v1");
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
