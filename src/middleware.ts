import { NextRequest, NextResponse } from "next/server";

/**
 * Password gate for the Pixelform tool (/pf). HTTP Basic Auth over HTTPS —
 * the browser shows a native login prompt. Any username; the password is
 * PF_PASSWORD (set it in Vercel → Settings → Environment Variables). A default
 * is used until you set your own.
 */
const PASSWORD = process.env.PF_PASSWORD || "notnormal";

export function middleware(req: NextRequest) {
  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const pass = decoded.slice(decoded.indexOf(":") + 1);
      if (pass === PASSWORD) return NextResponse.next();
    } catch {
      /* fall through to challenge */
    }
  }
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Pixelform", charset="UTF-8"' },
  });
}

export const config = { matcher: ["/pf", "/pf.html"] };
