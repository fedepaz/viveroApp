// src/features/users/components/users-dashboard-skeleton.tsx
"use client";

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { clientColumns } from "./columns";

export function ClientsDashboardSkeleton() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <DataTableSkeleton columnCount={clientColumns.length} />
    </div>
  );
}
