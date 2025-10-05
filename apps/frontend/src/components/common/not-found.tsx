// src/components/common/not-found.tsx
"use client";

import { Link, useRouter } from "@/i18n/navigation";

import { useTranslations } from "next-intl";

export function NotFoundPage() {
  const t = useTranslations("NotFound");

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">{t("title")}</p>
      <p className="text-md mt-2 text-muted-foreground">{t("description")}</p>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          {t("goBack")}
        </button>
        <Link
          href={"/"}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
