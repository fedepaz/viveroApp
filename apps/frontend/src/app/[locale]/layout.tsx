//src/app/[locale]/layout.tsx

import type React from "react";

import { Suspense, use } from "react";
import { LoadingSpinner } from "@/components/common/loading-spinner";

import { NextIntlClientProvider } from "next-intl";
import { generateLocaleStaticParams } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import getRequestConfig from "../../../src/i18n/request";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { ThemeProvider } from "@/providers/theme-provider";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { ReactClientProvider } from "@/providers/query-client-provider";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const { messages } = await getRequestConfig({ locale });
  return (
    <ThemeProvider>
      <NextIntlClientProvider messages={messages}>
        <ReactClientProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <LayoutWrapper>
              <DashboardHeader />
              {children}
            </LayoutWrapper>
          </Suspense>
        </ReactClientProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
