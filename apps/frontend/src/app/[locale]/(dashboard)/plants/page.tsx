import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PlantGrid } from "@/features/plant-management";
import {
  generateLocaleStaticParams,
  getLocaleFromParams,
} from "@/i18n/routing";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

interface PlantsPageProps {
  params: Promise<{ locale: string }>;
}
export default function PlantsPage({ params }: PlantsPageProps) {
  const locale = getLocaleFromParams(params);
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <PlantGrid />
      </main>
    </div>
  );
}
