import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableHeader, StatusBadge } from "@/components/data-display/data-table";
import { User } from "../types";

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
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableHeader column={column}>Email</SortableHeader>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <SortableHeader column={column}>Role</SortableHeader>
    ),
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
    header: ({ column }) => (
      <SortableHeader column={column}>Status</SortableHeader>
    ),
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
    header: ({ column }) => (
      <SortableHeader column={column}>Department</SortableHeader>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <SortableHeader column={column}>Last Login</SortableHeader>
    ),
  },
];
