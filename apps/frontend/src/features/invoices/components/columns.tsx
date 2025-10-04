import {
  SortableHeader,
  StatusBadge,
} from "@/components/data-display/data-table";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Invoice } from "../types";
import { useTranslations } from "next-intl";

interface HeaderProps {
  column: ColumnDef<Invoice>;
  translationKey: string;
}

function HeaderComponent({ column, translationKey }: HeaderProps) {
  const t = useTranslations();
  return <SortableHeader column={column}>{t(translationKey)}</SortableHeader>;
}

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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="invoiceNumber" />;
    },
  },
  {
    accessorKey: "client",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="client" />;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="amount" />;
    },
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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="status" />;
    },
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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="createdDate" />;
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="dueDate" />;
    },
  },
];

export { invoiceColumns };
