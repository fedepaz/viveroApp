import { intlMiddleware } from "@/middlewares/intl-middleware";
import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(es|en)/:path*"],
};
