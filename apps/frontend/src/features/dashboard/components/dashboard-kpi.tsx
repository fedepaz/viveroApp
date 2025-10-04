//src/features/dashboard/components/dashboard-kpi.tsx

import { KPICard } from "@/components/data-display/kpi-card";
import { useDashboardKPIs } from "../hooks/hooks";
import { ShoppingCart, Sprout, TrendingUp, Users } from "lucide-react";
import { useTranslations } from "next-intl";

function DashboardKPI() {
  const t = useTranslations("DashboardKpi");
  const { data: kpi } = useDashboardKPIs();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title={t("totalPlants")}
        value={kpi?.totalPlants}
        description="Total number of plants"
        icon={Sprout}
        trend={{ value: 12.5, label: "from last month", isPositive: true }}
      />
      <KPICard
        title={t("activePlants")}
        value={kpi?.activePlants}
        description="Number of active plants"
        icon={Users}
        trend={{ value: 8.2, label: "from last month", isPositive: true }}
      />
      <KPICard
        title="Monthly Revenue"
        value={`${(kpi?.monthlyRevenue / 1000).toFixed(1)} $`}
        description={`${kpi?.openInvoices} open invoices`}
        icon={TrendingUp}
        trend={{ value: 15.5, label: "from last month", isPositive: true }}
      />
      <KPICard
        title="Pending Orders"
        value={kpi?.pendingOrders}
        description="Awaiting approval"
        icon={ShoppingCart}
      />
    </div>
  );
}

export default DashboardKPI;
