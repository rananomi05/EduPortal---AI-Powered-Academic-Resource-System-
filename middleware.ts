import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // ===== If user is not logged in → redirect to login =====
  if (!token) {
    if (!pathname.startsWith("/login")) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const role = token.role as string;

  // ===== Redirect logged-in users from home or login to their dashboard =====
  if (pathname === "/" || pathname === "/login") {
    if (role === "admin") url.pathname = "/dashboard/admin";
    else if (role === "faculty") url.pathname = "/dashboard/faculty";
    else url.pathname = "/dashboard/student";

    return NextResponse.redirect(url);
  }

  // ===== Protect Admin Dashboard =====
  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  // ===== Protect Faculty Dashboard =====
  if (
    pathname.startsWith("/dashboard/faculty") &&
    role !== "faculty" &&
    role !== "admin"
  ) {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  // ===== Protect Student Dashboard =====
  if (
    pathname.startsWith("/dashboard/student") &&
    !["student", "faculty", "admin"].includes(role)
  ) {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ===== Apply middleware only to dashboard, login, and home =====
export const config = {
  matcher: ["/dashboard/:path*", "/", "/login"],
};