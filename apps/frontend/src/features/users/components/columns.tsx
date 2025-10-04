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
  const t = useTranslations("UserDataTable");
  return <SortableHeader column={column}>{t(translationKey)}</SortableHeader>;
}

export const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const t = useTranslations("UserDataTable");
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={t("selectAll")}
        />
      );
    },
    cell: ({ row }) => {
      const t = useTranslations("UserDataTable");
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
    cell: ({ row }) => {
      const t = useTranslations("UserDataTable");
      const role = row.getValue("role") as string;
      return (
        <StatusBadge status={role === "admin" ? "critical" : "info"}>
          {t(role)}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="status" />;
    },
    cell: ({ row }) => {
      const t = useTranslations("UserDataTable");
      const status = row.getValue("status") as string;
      return (
        <StatusBadge status={status === "active" ? "healthy" : "inactive"}>
          {t(status)}
        </StatusBadge>
      );
    },
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
