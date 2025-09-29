//src/features/plants/components/plant-dashboard-skeleton.tsx
"use client";

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { plantColumns } from "./columns";

export function PlantsDashboardSkeleton() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <DataTableSkeleton columnCount={plantColumns.length} />
    </div>
  );
}
