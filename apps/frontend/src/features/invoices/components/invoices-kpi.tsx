//src/features/invoices/components/invoices-kpi.tsx
"use client";

import { KPICard } from "@/components/data-display/kpi-card";
import { FileText, DollarSign, CheckCircle2, Clock } from "lucide-react";
import { useInvoices } from "../hooks/hooks";
import { useTranslations } from "next-intl";

function InvoiceKPIs() {
  const t = useTranslations("InvoicesKpi");
  const { data: mockInvoices = [] } = useInvoices();
  const totalInvoices = mockInvoices.length;
  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = mockInvoices.filter(
    (inv) => inv.status === "paid"
  ).length;
  const overdueInvoices = mockInvoices.filter(
    (inv) => inv.status === "overdue"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title={t("totalInvoices")}
        value={totalInvoices}
        description="All time"
        icon={FileText}
        trend={{ value: 8.3, label: "from last month", isPositive: true }}
      />
      <KPICard
        title="Total Revenue"
        value={`€${(totalRevenue / 1000).toFixed(1)}k`}
        description="From all invoices"
        icon={DollarSign}
        trend={{ value: 15.2, label: "from last month", isPositive: true }}
      />
      <KPICard
        title={t("paidInvoices")}
        value={paidInvoices}
        description={`${totalInvoices - paidInvoices} pending`}
        icon={CheckCircle2}
      />
      <KPICard
        title={t("pendingInvoices")}
        value={overdueInvoices}
        description="Require follow-up"
        icon={Clock}
      />
    </div>
  );
}

export default InvoiceKPIs;
