//src/features/dashboard/hooks/hooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { mockDashboardService } from "../api/mockDashboardService";

export const DASHBOARD_QUERY_KEYS = {
  all: "dashboard" as const,
  criticalAlerts: () =>
    [...DASHBOARD_QUERY_KEYS.all, "criticalAlerts"] as const,
  metrics: () => [...DASHBOARD_QUERY_KEYS.all, "metrics"] as const,
  environmentalData: () =>
    [...DASHBOARD_QUERY_KEYS.all, "environmentalData"] as const,
};

export function useDashboardCriticalAlerts() {
  return useSuspenseQuery({
    queryKey: DASHBOARD_QUERY_KEYS.criticalAlerts(),
    queryFn: mockDashboardService.fetchCriticalAlerts,
  });
}
export function useDashboardMetrics() {
  return useSuspenseQuery({
    queryKey: DASHBOARD_QUERY_KEYS.metrics(),
    queryFn: mockDashboardService.fetchMetrics,
  });
}
export function useDashboardEnvironmentalData() {
  return useSuspenseQuery({
    queryKey: DASHBOARD_QUERY_KEYS.environmentalData(),
    queryFn: mockDashboardService.fetchEnvironmentalData,
  });
}
