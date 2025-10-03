import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  // Get the locale from the request
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      ...(await import(`../../messages/${locale}/common.json`)).default,
      ...(await import(`../../messages/${locale}/main.json`)).default,
      ...(await import(`../../messages/${locale}/alerts.json`)).default,
      ...(await import(`../../messages/${locale}/navigation.json`)).default,
      ...(await import(
        `../components/layout/dashboard-header/messages/${locale}.json`
      )).default,
      ...(await import(
        `../components/common/language-switcher/messages/${locale}.json`
      )).default,
      ...(await import(
        `../components/common/theme-toggle/messages/${locale}.json`
      )).default,
      ...(await import(
        `../components/data-display/data-table/column-filters/messages/${locale}.json`
      )).default,
      ...(await import(
        `../components/data-display/data-table/data-table/messages/${locale}.json`
      )).default,
    },
  };
});
