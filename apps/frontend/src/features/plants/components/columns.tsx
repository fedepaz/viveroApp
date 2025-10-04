import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SortableHeader,
  StatusBadge,
} from "@/components/data-display/data-table";
import { Plant } from "../types";
import { useTranslations } from "next-intl";

interface HeaderProps {
  column: ColumnDef<Plant>;
  translationKey: string;
}

function HeaderComponent({ column, translationKey }: HeaderProps) {
  const t = useTranslations();
  return <SortableHeader column={column}>{t(translationKey)}</SortableHeader>;
}

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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="name" />;
    },
  },
  {
    accessorKey: "species",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="species" />;
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="location" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="status" />;
    },
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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="temperature" />;
    },
    cell: ({ row }) => `${row.getValue("temperature")}°C`,
  },
  {
    accessorKey: "humidity",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="humidity" />;
    },
    cell: ({ row }) => `${row.getValue("humidity")}%`,
  },
  {
    accessorKey: "plantedDate",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="plantedDate" />;
    },
  },
  {
    accessorKey: "harvestDate",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="harvestDate" />;
    },
  },
];
