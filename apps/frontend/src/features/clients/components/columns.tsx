import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SortableHeader } from "@/components/data-display/data-table";
import { Client } from "../types";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface HeaderProps {
  column: ColumnDef<Client>;
  translationKey: string;
}

function HeaderComponent({ column, translationKey }: HeaderProps) {
  const t = useTranslations();
  return <SortableHeader column={column}>{t(translationKey)}</SortableHeader>;
}

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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="name" />;
    },
  },
  {
    accessorKey: "contactPerson",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="contactPerson" />;
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="email" />;
    },
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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="phone" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="status" />;
    },
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
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="totalOrders" />;
    },
    cell: ({ row }) => `${row.getValue("totalOrders")}`,
  },
  {
    accessorKey: "totalRevenue",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="totalRevenue" />;
    },
    cell: ({ row }) => `${row.getValue("totalRevenue")}`,
  },
  {
    accessorKey: "lastOrder",
    header: ({ column }) => {
      return <HeaderComponent column={column} translationKey="lastOrder" />;
    },
    cell: ({ row }) => `${row.getValue("lastOrder")}`,
  },
];
