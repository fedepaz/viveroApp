import { DashboardHeader } from "@/components/agricultural/dashboard-header";
import { DashboardMetrics } from "@/components/agricultural/dashboard-metrics";
import { EnvironmentalOverview } from "@/components/agricultural/environmental-overview";
import { PlantStatusOverview } from "@/components/agricultural/plant-status-overview";
import { CriticalAlerts } from "@/components/agricultural/critical-alerts";
import { QuickActions } from "@/components/agricultural/quick-actions";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";

// Mock data - in production this would come from your API
const mockDashboardData = {
  metrics: {
    totalPlants: 12847,
    healthyPlants: 11203,
    plantsNeedingAttention: 1456,
    criticalAlerts: 188,
    averageTemperature: 22.3,
    averageHumidity: 68.5,
    harvestReadyCount: 2341,
    productionEfficiency: 94.2,
  },
  environmentalData: {
    greenhouse: {
      id: "gh-001",
      name: "Main Production Facility",
      sections: [
        {
          id: "section-a",
          name: "Section A",
          sensors: {
            temperature: {
              current: 22.3,
              optimal: { min: 18, max: 24 },
              trend: "stable" as const,
              history: [],
            },
            humidity: {
              current: 68.5,
              optimal: { min: 60, max: 75 },
              trend: "rising" as const,
            },
            light: {
              current: 15000,
              dailyTotal: 180000,
              spectrum: "full" as const,
            },
          },
        },
      ],
    },
    alertThresholds: {
      temperature: { warning: 26, critical: 30 },
      humidity: { warning: 80, critical: 90 },
    },
  },
  criticalAlerts: [
    {
      id: "alert-001",
      type: "temperature" as const,
      severity: "critical" as const,
      messageKey: "temperatureHigh",
      location: "Greenhouse B - Section 3",
      timestamp: new Date(),
      plantCount: 45,
    },
    {
      id: "alert-002",
      type: "pest" as const,
      severity: "high" as const,
      messageKey: "pestInfestation",
      location: "Greenhouse A - Section 1",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      plantCount: 120,
    },
    {
      id: "alert-003",
      type: "humidity" as const,
      severity: "medium" as const,
      messageKey: "humidityHigh",
      location: "Greenhouse C - Section 2",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      plantCount: 78,
    },
  ],
};

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Critical Alerts - Always visible at top */}
        <CriticalAlerts alerts={mockDashboardData.criticalAlerts} />

        {/* Key Metrics Overview */}
        <DashboardMetrics metrics={mockDashboardData.metrics} />

        {/* Environmental and Plant Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnvironmentalOverview data={mockDashboardData.environmentalData} />
          <PlantStatusOverview />
        </div>

        {/* Quick Actions for Mobile Users */}
        <QuickActions />
      </main>
    </div>
  );
}
