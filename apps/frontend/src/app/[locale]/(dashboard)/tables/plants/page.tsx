import { DataTableSkeleton } from "@/components/data-display/data-table";
import { PlantsDashboard } from "@/features/plants";
import { plantColumns } from "@/features/plants/components/columns";
import { setRequestLocale } from "next-intl/server";
import { Suspense, use } from "react";

interface PlantsPageProps {
  params: Promise<{ locale: string }>;
}

export default function PlantsPage({ params }: PlantsPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <Suspense
      fallback={<DataTableSkeleton columnCount={plantColumns.length} />}
    >
      <PlantsDashboard />
    </Suspense>
  );
}
