//src/features/invoices/components/InvoicesDashboard.tsx

import { DataTableSkeleton } from "@/components/data-display/data-table";
import React, { Suspense } from "react";
import { KPICardSkeleton } from "@/components/data-display/kpi-card";
import { ClientsDataTable } from "@/features/clients/components/clients-data-table";
import ClientsKPI from "@/features/clients/components/clients-kpi";
import { clientColumns } from "@/features/clients/components/columns";

export function InvoicesDashboard() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <KPICardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ClientsKPI />
      </Suspense>

      <Suspense
        fallback={<DataTableSkeleton columnCount={clientColumns.length} />}
      >
        <ClientsDataTable />
      </Suspense>
    </div>
  );
}
