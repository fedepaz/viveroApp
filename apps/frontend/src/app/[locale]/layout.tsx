import type React from "react";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  return children;
}
