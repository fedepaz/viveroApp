//src/app/[locale]/(dashboard)/plantsManagement/page.tsx

import { PlantGrid, PlantGridSkeleton } from "@/features/plant-management";
import { generateLocaleStaticParams } from "@/i18n/routing";
import { Suspense, use } from "react";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

interface PlantsManagementPageProps {
  params: Promise<{ locale: string }>;
}

export default function PlantsManagementPage({
  params,
}: PlantsManagementPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <Suspense fallback={<PlantGridSkeleton />}>
      <PlantGrid />
    </Suspense>
  );
}
