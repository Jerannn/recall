import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

// Define route categories
const authRoutes = ["/signin", "/signup"];
const protectedRoutes = ["/dashboard", "/library"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if current route is protected or auth-only
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Fetch user session via Better-Auth
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // 1. If accessing Protected Route WITHOUT session -> Redirect to /signin
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 2. If accessing Auth Route (/signin, /signup) WITH session -> Redirect to /dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. Allow public routes or valid requests
  return NextResponse.next();
}

// Config matcher: Exclude static files, images, and API routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
