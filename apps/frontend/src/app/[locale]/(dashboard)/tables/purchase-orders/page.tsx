import { DataTableSkeleton } from "@/components/data-display/data-table";
import { PurchaseOrdersDashboard } from "@/features/purchase-orders";
import { purchaseOrderColumns } from "@/features/purchase-orders/components/columns";
import { setRequestLocale } from "next-intl/server";
import { Suspense, use } from "react";

interface PurchaseOrdersPageProps {
  params: Promise<{ locale: string }>;
}

export default function PurchaseOrdersPage({
  params,
}: PurchaseOrdersPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <Suspense
      fallback={<DataTableSkeleton columnCount={purchaseOrderColumns.length} />}
    >
      <PurchaseOrdersDashboard />
    </Suspense>
  );
}
