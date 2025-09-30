//src/features/dashboard/components/Dashboard.tsx
"use client";

import { PlantStatusOverview } from "@/features/plant-grid";
import { CriticalAlerts } from "./critical-alerts";
import { DashboardMetrics } from "./dashboard-metrics";
import { EnvironmentalOverview } from "./environmental-overview";
import { QuickActions } from "./quick-actions";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/common/loading-spinner";

export function RootDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Critical Alerts - Always visible at top */}
        <Suspense fallback={<LoadingSpinner />}>
          <CriticalAlerts />
        </Suspense>

        {/* Key Metrics Overview */}
        <Suspense fallback={<LoadingSpinner />}>
          <DashboardMetrics />
        </Suspense>

        {/* Environmental and Plant Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<LoadingSpinner />}>
            <EnvironmentalOverview />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <PlantStatusOverview />
          </Suspense>
        </div>

        {/* Quick Actions for Mobile Users */}
        <Suspense fallback={<LoadingSpinner />}>
          <QuickActions />
        </Suspense>
      </main>
    </div>
  );
}
