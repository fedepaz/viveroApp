import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SortableHeader,
  StatusBadge,
} from "@/components/data-display/data-table";
import { Plant } from "../types";
import { useLocale, useTranslations } from "next-intl";

interface HeaderProps {
  column: ColumnDef<Plant>;
  translationKey: string;
}

function HeaderComponent({ column, translationKey }: HeaderProps) {
  const t = useTranslations("PlantsDataTable");
  return <SortableHeader column={column}>{t(translationKey)}</SortableHeader>;
}

export const plantColumns: ColumnDef<Plant>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const t = useTranslations("PlantsDataTable");
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={t("selectAll")}
        />
      );
    },
    cell: ({ row }) => {
      const t = useTranslations("PlantsDataTable");
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={t("selectRow")}
        />
      );
    },
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
    cell: ({ row }) => {
      const t = useTranslations("PlantsDataTable");
      const status = row.getValue("status") as string;
      return (
        <StatusBadge
          status={row.getValue("status") as "healthy" | "warning" | "critical"}
        >
          {t(status)}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: "temperature",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="temperature" />;
    },
    cell: ({ row }) => {
      const t = useTranslations("PlantsDataTable");
      return t("temperatureValue", { value: row.getValue("temperature") });
    },
  },
  {
    accessorKey: "humidity",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="humidity" />;
    },
    cell: ({ row }) => {
      const t = useTranslations("PlantsDataTable");
      return t("humidityValue", { value: row.getValue("humidity") });
    },
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
