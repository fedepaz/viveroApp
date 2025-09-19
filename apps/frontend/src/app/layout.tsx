import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { NextIntlClientProvider } from "next-intl";
import getRequestConfig from "../i18n/request";
import { ThemeProvider } from "next-themes";

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

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  const { messages } = await getRequestConfig({
    requestLocale: Promise.resolve(locale),
  });

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
            <Analytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
