import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/common/loading-spinner";

import { NextIntlClientProvider } from "next-intl";
import {
  generateLocaleStaticParams,
  getLocaleFromParams,
} from "@/i18n/routing";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { ThemeProvider } from "@/providers/theme-provider";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

export const metadata: Metadata = {
  title: "AgriManage - Agricultural Management System",
  description: "Professional agricultural plant management dashboard",
  generator: "v0.app",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const locale = getLocaleFromParams(params);
  return (
    <ThemeProvider>
      <NextIntlClientProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Suspense>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
