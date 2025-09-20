import { PlantGrid } from "@/components/agricultural/plant-grid";
import { routing } from "@/i18n/routing";

import { DashboardHeader } from "@/components/agricultural/dashboard-header";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface PlantsPageProps {
  params: Promise<{ locale: string }>;
}
export default function PlantsPage({ params }: PlantsPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <PlantGrid />
      </main>
    </div>
  );
}
