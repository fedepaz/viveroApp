import { defineRouting } from "next-intl/routing";

// Defines supported locales and the default
export const routing = defineRouting({
  locales: ["en", "es", "it"],
  defaultLocale: "en",
});

// Helper to generate static paths for all locales
export function generateLocaleStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
