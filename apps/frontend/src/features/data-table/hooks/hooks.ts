//src/features/data-table/hooks/hooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { mockDataTableService } from "../api/mockDataTableService";

export const DATA_TABLE_QUERY_KEYS = {
  all: "dataTables" as const,
  lists: () => [...DATA_TABLE_QUERY_KEYS.all, "lists"] as const,
};

export function useDataTables() {
  return useSuspenseQuery({
    queryKey: DATA_TABLE_QUERY_KEYS.lists(),
    queryFn: mockDataTableService.fetchDataTables,
  });
}
