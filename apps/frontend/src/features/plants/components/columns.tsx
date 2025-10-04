import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableHeader, StatusBadge } from "@/components/data-display/data-table";
import { Plant } from "../types";
import { useTranslations } from "next-intl";

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
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("name")}</SortableHeader>;
    },
  },
  {
    accessorKey: "species",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("species")}</SortableHeader>;
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("location")}</SortableHeader>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("status")}</SortableHeader>;
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
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("temperature")}</SortableHeader>;
    },
    cell: ({ row }) => `${row.getValue("temperature")}°C`,
  },
  {
    accessorKey: "humidity",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("humidity")}</SortableHeader>;
    },
    cell: ({ row }) => `${row.getValue("humidity")}%`,
  },
  {
    accessorKey: "plantedDate",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("plantedDate")}</SortableHeader>;
    },
  },
  {
    accessorKey: "harvestDate",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("harvestDate")}</SortableHeader>;
    },
  },
];
