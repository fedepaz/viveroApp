import { PlantGrid } from "@/features/plant-management";
import { generateLocaleStaticParams } from "@/i18n/routing";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

interface PlantsPageProps {
  params: Promise<{ locale: string }>;
}

export default function PlantsPage({ params }: PlantsPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6">
        <PlantGrid />
      </main>
    </div>
  );
}
