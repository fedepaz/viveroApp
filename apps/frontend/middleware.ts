import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const pathname = request.nextUrl.pathname;
  //isAuthenticated temporary, replace with Clerk, Auth0, or your backend later
  const isAuthenticated = request.cookies.get("auth")?.value === "true";

  if (pathname.includes("/login") || pathname.includes("/signup")) {
    if (isAuthenticated) {
      const locale = pathname.split("/")[1]; // Get locale from pathname
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.url)
      );
    }
    return response;
  }
  if (pathname.includes("/dashboard")) {
    if (!isAuthenticated) {
      const locale = pathname.split("/")[1]; // Get locale from pathname
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
    return response;
  }
  return response;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _static (inside /public)
  // - all root files inside /public (e.g. /favicon.ico)
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(en|es|it)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_static|.*\\..*).*)",
  ],
};
