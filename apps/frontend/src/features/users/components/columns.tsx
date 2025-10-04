import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SortableHeader,
  StatusBadge,
} from "@/components/data-display/data-table";
import { User } from "../types";
import { useTranslations } from "next-intl";

interface HeaderProps {
  column: ColumnDef<User>;
  translationKey: string;
}

function HeaderComponent({ column, translationKey }: HeaderProps) {
  const t = useTranslations();
  return <SortableHeader column={column}>{t(translationKey)}</SortableHeader>;
}

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
      return <HeaderComponent column={column} translationKey="name" />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="email" />;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="role" />;
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
      return <HeaderComponent column={column} translationKey="status" />;
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
      return <HeaderComponent column={column} translationKey="department" />;
    },
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="lastLogin" />;
    },
  },
];
