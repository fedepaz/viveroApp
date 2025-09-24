// src/app/layout.tsx
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { enUS, esES, itIT } from "@clerk/localizations";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

type LocaleKey = "en" | "es" | "it";

export const metadata: Metadata = {
  title: "AgriManage - Agricultural Management System",
  description: "Professional agricultural plant management dashboard",
  generator: "v0.app",
};

const locale: LocaleKey = "es";
const localizations = {
  en: enUS,
  es: esES,
  it: itIT,
} as const;

const clerkLocalization = localizations[locale];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={clerkLocalization}>
      <html suppressHydrationWarning>
        <body className="font-sans">{children}</body>
      </html>
    </ClerkProvider>
  );
}
