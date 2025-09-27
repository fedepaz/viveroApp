import { PurchaseOrdersDashboard } from "@/features/purchase-orders";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

interface PurchaseOrdersPageProps {
  params: Promise<{ locale: string }>;
}

export default function PurchaseOrdersPage({
  params,
}: PurchaseOrdersPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 space-y-6">
        <PurchaseOrdersDashboard />
      </main>
    </div>
  );
}
