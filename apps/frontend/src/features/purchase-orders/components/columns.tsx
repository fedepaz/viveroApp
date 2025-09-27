import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableHeader, StatusBadge } from "@/components/data-display/data-table";
import { PurchaseOrder } from "../types";

export const purchaseOrderColumns: ColumnDef<PurchaseOrder>[] = [
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
    accessorKey: "orderNumber",
    header: ({ column }) => (
      <SortableHeader column={column}>Order #</SortableHeader>
    ),
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => (
      <SortableHeader column={column}>Supplier</SortableHeader>
    ),
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <SortableHeader column={column}>Items</SortableHeader>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <SortableHeader column={column}>Total Amount</SortableHeader>
    ),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("totalAmount"));
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
        delivered: "healthy",
        approved: "info",
        pending: "warning",
        cancelled: "critical",
      } as const;
      return (
        <StatusBadge status={statusMap[status as keyof typeof statusMap]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Order Date</SortableHeader>
    ),
  },
  {
    accessorKey: "deliveryDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Delivery Date</SortableHeader>
    ),
  },
];
