//src/features/dashboard/components/RootDashboard.tsx
"use client";

import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Suspense } from "react";
import DashboardKPI from "./dashboard-kpi";
import FeatureNavigation from "./feature-navigation";
import { KPICardSkeleton } from "@/components/data-display/kpi-card";
import DashboardAlerts from "./dashboard-alerts";
import RecentActivity from "./recent-activity";

export function RootDashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 space-y-6 p-6">
        <Suspense
          fallback={
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <LoadingSpinner key={i} />
              ))}
            </div>
          }
        >
          <DashboardKPI />
        </Suspense>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense
              fallback={
                <div className="grid gap-4 md:grid-cols-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <LoadingSpinner key={i} />
                  ))}
                </div>
              }
            >
              <FeatureNavigation />
            </Suspense>
          </div>
          <div className="space-y-6">
            <Suspense fallback={<KPICardSkeleton />}>
              <DashboardAlerts />
            </Suspense>
            <Suspense fallback={<KPICardSkeleton />}>
              <RecentActivity />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
