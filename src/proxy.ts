import { NextResponse, type NextRequest } from "next/server";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth/jwt";

/** Next 16 proxy (replaces middleware.ts): gate /admin and /api/admin. */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pixelform tool (/pf) — simple HTTP Basic Auth gate. Any username; the
  // password is PF_PASSWORD (set in Vercel), with a default until you set one.
  if (pathname === "/pf" || pathname === "/pf.html") {
    const header = req.headers.get("authorization");
    const password = process.env.PF_PASSWORD || "notnormal";
    if (header?.startsWith("Basic ")) {
      try {
        const decoded = atob(header.slice(6));
        if (decoded.slice(decoded.indexOf(":") + 1) === password) return NextResponse.next();
      } catch {
        /* fall through to challenge */
      }
    }
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Pixelform", charset="UTF-8"' },
    });
  }

  // login/logout + the passkey login ceremony must be reachable unauthenticated
  if (
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout" ||
    pathname === "/api/admin/passkey/login/options" ||
    pathname === "/api/admin/passkey/login/verify"
  ) {
    return NextResponse.next();
  }

  const ok = await verifyToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/pf", "/pf.html"],
};
