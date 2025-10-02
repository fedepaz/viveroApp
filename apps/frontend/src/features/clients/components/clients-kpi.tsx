//src/features/clients/components/clients-kpi.tsx
"use client";

import { KPICard } from "@/components/data-display/kpi-card";
import { Building2, TrendingUp, UserCheck, Users } from "lucide-react";

import { useClients } from "../hooks/hooks";

function ClientsKPI() {
  const { data: clients = [] } = useClients();
  const totalClients = clients.length;
  const activeClients = clients.filter(
    (client) => client.status === "active"
  ).length;
  const totalRevenue = clients.reduce(
    (acc, client) => acc + client.totalRevenue,
    0
  );
  const prospects = clients.filter(
    (client) => client.status === "prospect"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Clients"
        value={totalClients.toLocaleString()}
        description="In database"
        icon={Building2}
        trend={{ value: 6.5, label: "from last month", isPositive: true }}
      />
      <KPICard
        title="Active Clients"
        value={activeClients.toLocaleString()}
        description={`${prospects} prospects`}
        icon={UserCheck}
      />
      <KPICard
        title="Total Revenue"
        value={`€${(totalRevenue / 1000).toFixed(0)}k`}
        description="From all clients"
        icon={TrendingUp}
        trend={{ value: 18.2, label: "from last month", isPositive: true }}
      />
      <KPICard
        title="New Prospects"
        value={prospects}
        description="Potential clients"
        icon={Users}
      />
    </div>
  );
}

export default ClientsKPI;
