import { defineRouting } from "next-intl/routing";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export const locales = ["en", "es", "it"];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
});

export function generateLocaleStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function getLocaleFromParams(params: Promise<{ locale: string }>) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return locale;
}
