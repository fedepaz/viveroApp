import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SortableHeader,
  StatusBadge,
} from "@/components/data-display/data-table";
import { PurchaseOrder } from "../types";
import { useTranslations } from "next-intl";

interface HeaderProps {
  column: ColumnDef<PurchaseOrder>;
  translationKey: string;
}

function HeaderComponent({ column, translationKey }: HeaderProps) {
  const t = useTranslations();
  return <SortableHeader column={column}>{t(translationKey)}</SortableHeader>;
}

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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="orderNumber" />;
    },
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="supplier" />;
    },
  },
  {
    accessorKey: "items",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="items" />;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="totalAmount" />;
    },
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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="status" />;
    },
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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="orderDate" />;
    },
  },
  {
    accessorKey: "deliveryDate",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="deliveryDate" />;
    },
  },
];
