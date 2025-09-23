import { LoadingSpinner } from "@/components/common/loading-spinner";
import { getLocaleFromParams } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function AuthLayout({
  children,
  params,
}: AuthLayoutProps) {
  const locale = getLocaleFromParams(params);
  return (
    <ThemeProvider>
      <NextIntlClientProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </Suspense>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
