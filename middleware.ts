import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ===== TARGET ROUTE SAJA =====
  const protectedRoutes = [
    "/app/dashboard",
    "/app/kuitansi",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Jika bukan route target → lewatkan
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // ===== BLOK MOBILE DEVICE =====
  const userAgent = request.headers.get("user-agent") || "";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

  if (isMobile) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  return NextResponse.next();
}

/* ===== MATCHER DIKERUCUTKAN ===== */
export const config = {
  matcher: [
    "/app/dashboard/:path*",
    "/app/kuitansi/:path*",
  ],
};
