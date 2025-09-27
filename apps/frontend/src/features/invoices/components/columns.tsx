import {
  SortableHeader,
  StatusBadge,
} from "@/components/data-display/data-table";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Invoice } from "../types";

const invoiceColumns: ColumnDef<Invoice>[] = [
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
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <SortableHeader column={column}>Invoice #</SortableHeader>
    ),
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <SortableHeader column={column}>Client</SortableHeader>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <SortableHeader column={column}>Amount</SortableHeader>
    ),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column}>Status</SortableHeader>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusMap = {
        paid: "healthy",
        pending: "warning",
        overdue: "critical",
      } as const;
      return (
        <StatusBadge status={statusMap[status as keyof typeof statusMap]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Created</SortableHeader>
    ),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Due Date</SortableHeader>
    ),
  },
];

export { invoiceColumns };
