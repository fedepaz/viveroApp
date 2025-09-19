import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LayoutWrapper } from "@/components/agricultural/layout-wrapper";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "AgriManage - Agricultural Management System",
  description: "Professional agricultural plant management dashboard",
  generator: "v0.app",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={<div>Loading...</div>}>
            <LayoutWrapper>{children}</LayoutWrapper>
          </Suspense>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
