//src/features/plant-management/hooks/plantStatusOverviewHooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { mockPlantStatusOverviewService } from "../api/mockPlantStatusOverviewService";

export const PLANT_STATUS_OVERVIEW_QUERY_KEYS = {
  all: "plantStatusOverview" as const,
  totalPlants: () =>
    [...PLANT_STATUS_OVERVIEW_QUERY_KEYS.all, "totalPlants"] as const,
  statusBreakdown: () =>
    [...PLANT_STATUS_OVERVIEW_QUERY_KEYS.all, "statusBreakdown"] as const,
  recentActivity: () =>
    [...PLANT_STATUS_OVERVIEW_QUERY_KEYS.all, "recentActivity"] as const,
  upcomingTasks: () =>
    [...PLANT_STATUS_OVERVIEW_QUERY_KEYS.all, "upcomingTasks"] as const,
};

export function useTotalPlants() {
  return useSuspenseQuery({
    queryKey: PLANT_STATUS_OVERVIEW_QUERY_KEYS.totalPlants(),
    queryFn: mockPlantStatusOverviewService.fetchTotalPlants,
  });
}

export function useStatusBreakdown() {
  return useSuspenseQuery({
    queryKey: PLANT_STATUS_OVERVIEW_QUERY_KEYS.statusBreakdown(),
    queryFn: mockPlantStatusOverviewService.fetchStatusBreakdown,
  });
}

export function useRecentActivity() {
  return useSuspenseQuery({
    queryKey: PLANT_STATUS_OVERVIEW_QUERY_KEYS.recentActivity(),
    queryFn: mockPlantStatusOverviewService.fetchRecentActivity,
  });
}

export function useUpcomingTasks() {
  return useSuspenseQuery({
    queryKey: PLANT_STATUS_OVERVIEW_QUERY_KEYS.upcomingTasks(),
    queryFn: mockPlantStatusOverviewService.fetchUpcomingTasks,
  });
}
