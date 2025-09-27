import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableHeader, StatusBadge } from "@/components/data-display/data-table";
import { Plant } from "../types";

export const plantColumns: ColumnDef<Plant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Plant ID</SortableHeader>
    ),
  },
  {
    accessorKey: "species",
    header: ({ column }) => (
      <SortableHeader column={column}>Species</SortableHeader>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <SortableHeader column={column}>Location</SortableHeader>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column}>Health Status</SortableHeader>
    ),
    cell: ({ row }) => (
      <StatusBadge
        status={row.getValue("status") as "healthy" | "warning" | "critical"}
      >
        {String(row.getValue("status")).charAt(0).toUpperCase() +
          String(row.getValue("status")).slice(1)}
      </StatusBadge>
    ),
  },
  {
    accessorKey: "temperature",
    header: ({ column }) => (
      <SortableHeader column={column}>Temperature (°C)</SortableHeader>
    ),
    cell: ({ row }) => `${row.getValue("temperature")}°C`,
  },
  {
    accessorKey: "humidity",
    header: ({ column }) => (
      <SortableHeader column={column}>Humidity (%)</SortableHeader>
    ),
    cell: ({ row }) => `${row.getValue("humidity")}%`,
  },
  {
    accessorKey: "plantedDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Planted Date</SortableHeader>
    ),
  },
  {
    accessorKey: "harvestDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Expected Harvest</SortableHeader>
    ),
  },
];
