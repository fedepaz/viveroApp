import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableHeader, StatusBadge } from "@/components/data-display/data-table";
import { PurchaseOrder } from "../types";
import { useTranslations } from "next-intl";

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
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("orderNumber")}</SortableHeader>;
    },
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("supplier")}</SortableHeader>;
    },
  },
  {
    accessorKey: "items",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("items")}</SortableHeader>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("totalAmount")}</SortableHeader>;
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
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("status")}</SortableHeader>;
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
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("orderDate")}</SortableHeader>;
    },
  },
  {
    accessorKey: "deliveryDate",
    header: ({ column }) => {
      const t = useTranslations("Columns");
      return <SortableHeader column={column}>{t("deliveryDate")}</SortableHeader>;
    },
  },
];
