import { NextResponse, type NextRequest } from "next/server";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth/jwt";
import { PF_COOKIE, pfPassword, pfToken } from "@/lib/pf-auth";
import { PF_LOGIN_HTML } from "@/lib/pf-login-html";

/** Next 16 proxy (replaces middleware.ts): gate /admin and /api/admin. */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pixelform tool (/pf) — cookie gate with a branded login page. The password
  // is PF_PASSWORD (set in Vercel), with a default until you set one.
  if (pathname === "/pf" || pathname === "/pf.html") {
    const expected = await pfToken(pfPassword());
    if (req.cookies.get(PF_COOKIE)?.value === expected) return NextResponse.next();
    return new NextResponse(PF_LOGIN_HTML, {
      status: 401,
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
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
