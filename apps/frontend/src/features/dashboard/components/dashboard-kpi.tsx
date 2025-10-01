//src/features/dashboard/components/dashboard-kpi.tsx

import { KPICard } from "@/components/data-display/kpi-card";
import { useDashboardKPIs } from "../hooks/hooks";
import { Sprout, TrendingUp, Users } from "lucide-react";

function DashboardKPI() {
  const { data: kpi } = useDashboardKPIs();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Plants"
        value={kpi?.totalPlants}
        description="Total number of plants"
        icon={Sprout}
        trend={{ value: 12.5, label: "from last month", isPositive: true }}
      />
      <KPICard
        title="Active Plants"
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
    </div>
  );
}

export default DashboardKPI;
