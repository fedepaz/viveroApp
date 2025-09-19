import { LayoutWrapper } from "@/components/agricultural/layout-wrapper";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type React from "react";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/common/loading-spinner";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Suspense fallback={<LoadingSpinner />}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </Suspense>
    </NextIntlClientProvider>
  );
}
