import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableHeader } from "@/components/data-display/data-table";
import { Client } from "../types";
import { Badge } from "@/components/ui/badge";

export const clientColumns: ColumnDef<Client>[] = [
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
    accessorKey: "contactPerson",
    header: ({ column }) => (
      <SortableHeader column={column}>Contact Person</SortableHeader>
    ),
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableHeader column={column}>Email</SortableHeader>
    ),
    cell: ({ row }) => (
      <a
        href={`mailto:${row.getValue("email")}`}
        className="text-blue-600 hover:text-blue-900 transition-colors"
      >
        {row.getValue("email")}
      </a>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <SortableHeader column={column}>Phone</SortableHeader>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column}>Status</SortableHeader>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants: Record<string, "default" | "destructive" | "outline"> = {
        active: "default",
        inactive: "destructive",
        prospect: "outline",
      };
      return (
        <Badge variant={variants[status]} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalOrders",
    header: ({ column }) => (
      <SortableHeader column={column}>Total Orders</SortableHeader>
    ),
    cell: ({ row }) => `${row.getValue("totalOrders")}`,
  },
  {
    accessorKey: "totalRevenue",
    header: ({ column }) => (
      <SortableHeader column={column}>Total Revenue</SortableHeader>
    ),
    cell: ({ row }) => `${row.getValue("totalRevenue")}`,
  },
  {
    accessorKey: "lastOrder",
    header: ({ column }) => (
      <SortableHeader column={column}>Last Order</SortableHeader>
    ),
    cell: ({ row }) => `${row.getValue("lastOrder")}`,
  },
];
