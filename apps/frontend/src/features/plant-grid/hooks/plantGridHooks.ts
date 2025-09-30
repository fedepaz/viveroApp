//src/features/plant-management/hooks/plantGridHooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { mockPlantGridService } from "../api/mockPlantGridService";

export const PLANT_GRID_QUERY_KEYS = {
  all: "plantGrid" as const,
  list: () => [...PLANT_GRID_QUERY_KEYS.all, "list"] as const,
};

export function usePlantGrid() {
  return useSuspenseQuery({
    queryKey: PLANT_GRID_QUERY_KEYS.list(),
    queryFn: mockPlantGridService.fetchPlants,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
