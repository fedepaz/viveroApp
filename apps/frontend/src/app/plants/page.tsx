import { PlantGrid } from "@/components/agricultural/plant-grid";
import { routing } from "@/i18n/routing";

import { DashboardHeader } from "@/components/agricultural/dashboard-header";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function PlantsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <PlantGrid />
      </main>
    </div>
  );
}
