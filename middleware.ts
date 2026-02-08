import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ===== IZINKAN HANYA ROUTE INI =====
  if (
    pathname === "/" ||
    pathname === "/404" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // ===== BLOK MOBILE DEVICE =====
  const userAgent = request.headers.get("user-agent") || "";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

  if (isMobile) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  // ===== SEMUA ROUTE LAIN DIPAKSA KE LOGIN =====
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
