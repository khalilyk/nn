import { NextResponse, type NextRequest } from "next/server";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth/jwt";

/** Next 16 proxy (replaces middleware.ts): gate /admin and /api/admin. */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // login/logout must be reachable unauthenticated
  if (pathname === "/api/admin/login" || pathname === "/api/admin/logout") {
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
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
