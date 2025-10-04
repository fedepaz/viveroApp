import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableHeader, StatusBadge } from "@/components/data-display/data-table";
import { User } from "../types";
import { useTranslations } from "next-intl";

export const userColumns: ColumnDef<User>[] = [
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
    accessorKey: "email",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("email")}</SortableHeader>;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("role")}</SortableHeader>;
    },
    cell: ({ row }) => (
      <StatusBadge
        status={row.getValue("role") === "admin" ? "critical" : "info"}
      >
        {String(row.getValue("role")).charAt(0).toUpperCase() +
          String(row.getValue("role")).slice(1)}
      </StatusBadge>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("status")}</SortableHeader>;
    },
    cell: ({ row }) => (
      <StatusBadge
        status={row.getValue("status") === "active" ? "healthy" : "inactive"}
      >
        {String(row.getValue("status")).charAt(0).toUpperCase() +
          String(row.getValue("status")).slice(1)}
      </StatusBadge>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("department")}</SortableHeader>;
    },
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("lastLogin")}</SortableHeader>;
    },
  },
];
