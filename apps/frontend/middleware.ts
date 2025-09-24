import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Define public routes, including sign-in, sign-up, and all localized pages.
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  // The root and all locale-prefixed routes are public.
  '/',
  '/(en|es|it)(.*)'
]);

export default clerkMiddleware((auth, req) => {
  // If the route is not public, protect it.
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  // Always run the intl middleware to handle locale detection and redirection.
  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
