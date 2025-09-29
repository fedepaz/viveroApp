import { DataTableSkeleton } from "@/components/data-display/data-table";
import { InvoicesDashboard } from "@/features/invoices";
import { invoiceColumns } from "@/features/invoices/components/columns";
import { setRequestLocale } from "next-intl/server";
import { Suspense, use } from "react";

interface InvoicePageProps {
  params: Promise<{ locale: string }>;
}

export default function InvoicesPage({ params }: InvoicePageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <Suspense
      fallback={<DataTableSkeleton columnCount={invoiceColumns.length} />}
    >
      <InvoicesDashboard />
    </Suspense>
  );
}
