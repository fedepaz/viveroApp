//src/features/plants/components/plants-kpi.tsx
"use client";

import { KPICard } from "@/components/data-display/kpi-card";
import { usePlants } from "../hooks/hooks";
import { Sprout, Leaf, AlertTriangle, Droplets } from "lucide-react";

function PlantKPIs() {
  const { data: mockPlants = [] } = usePlants();
  const totalPlants = mockPlants.length;
  const healthyPlants = mockPlants.filter((p) => p.status === "healthy").length;
  const criticalPlants = mockPlants.filter(
    (p) => p.status === "critical"
  ).length;
  const readyForHarvest = mockPlants.filter(
    (p) => p.growthStage === "Fruiting" || p.growthStage === "Mature"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Plants"
        value={totalPlants}
        description="Active in system"
        icon={Sprout}
        trend={{ value: 12.5, label: "from last month", isPositive: true }}
      />
      <KPICard
        title="Healthy Plants"
        value={healthyPlants}
        description={`${((healthyPlants / totalPlants) * 100).toFixed(0)}% of total`}
        icon={Leaf}
        trend={{ value: 5.2, label: "from last week", isPositive: true }}
      />
      <KPICard
        title="Critical Alerts"
        value={criticalPlants}
        description="Require immediate attention"
        icon={AlertTriangle}
      />
      <KPICard
        title="Ready for Harvest"
        value={readyForHarvest}
        description="Mature or fruiting stage"
        icon={Droplets}
      />
    </div>
  );
}

export default PlantKPIs;
