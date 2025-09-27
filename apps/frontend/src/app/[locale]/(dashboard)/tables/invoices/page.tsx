"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, SortableHeader, StatusBadge } from "@/features/data-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  dueDate: string;
  createdDate: string;
}

const generateInvoices = (count: number): Invoice[] => {
  const statuses: Invoice["status"][] = ["pending", "paid", "overdue"];
  const clients = [
    "Green Valley Farms",
    "Organic Produce Co",
    "Fresh Market Ltd",
    "Healthy Foods Inc",
    "Farm Fresh Direct",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `invoice-${i + 1}`,
    invoiceNumber: `INV-${String(i + 1).padStart(4, "0")}`,
    client: clients[Math.floor(Math.random() * clients.length)],
    amount: Math.round((Math.random() * 10000 + 500) * 100) / 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    dueDate: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    createdDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  }));
};

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

export default function InvoicesPage() {
  const invoices = React.useMemo(() => generateInvoices(500), []);

  const handleEdit = (row: Invoice) => {
    console.log("Edit invoice:", row);
    // Implement edit functionality
  };

  const handleDelete = (row: Invoice) => {
    console.log("Delete invoice:", row);
    // Implement delete functionality
  };

  const handleAdd = () => {
    console.log("Add new invoice");
    // Implement add functionality
  };

  const handleExport = () => {
    console.log("Export invoices data");
    // Implement export functionality
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/tables">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tables
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Invoice Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Track and manage all invoices and payments ({invoices.length}{" "}
            invoices)
          </p>
        </div>
      </div>

      <DataTable
        columns={invoiceColumns}
        data={invoices}
        title="Invoice Database"
        description="Complete financial tracking with payment status and client management"
        searchKey="invoiceNumber"
        totalCount={invoices.length}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleExport}
      />
    </div>
  );
}
