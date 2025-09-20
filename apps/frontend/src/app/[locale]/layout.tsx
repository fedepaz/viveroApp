import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import {
  generateLocaleStaticParams,
  getLocaleFromParams,
} from "@/i18n/routing";
import { LayoutWrapper } from "@/components/agricultural/layout-wrapper";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

export const metadata: Metadata = {
  title: "AgriManage - Agricultural Management System",
  description: "Professional agricultural plant management dashboard",
  generator: "v0.app",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = getLocaleFromParams(params);
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
      lang={locale}
    >
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <LayoutWrapper>{children}</LayoutWrapper>
            </Suspense>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
