"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, SortableHeader, StatusBadge } from "@/features/data-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  items: number;
  totalAmount: number;
  status: "pending" | "approved" | "delivered" | "cancelled";
  orderDate: string;
  deliveryDate: string;
}

const generatePurchaseOrders = (count: number): PurchaseOrder[] => {
  const statuses: PurchaseOrder["status"][] = [
    "pending",
    "approved",
    "delivered",
    "cancelled",
  ];
  const suppliers = [
    "Seeds & Supplies Co",
    "Agricultural Equipment Ltd",
    "Fertilizer Direct",
    "Packaging Solutions",
    "Transport Services",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `po-${i + 1}`,
    orderNumber: `PO-${String(i + 1).padStart(4, "0")}`,
    supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
    items: Math.floor(Math.random() * 50) + 1,
    totalAmount: Math.round((Math.random() * 50000 + 1000) * 100) / 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    deliveryDate: new Date(
      Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
  }));
};

const purchaseOrderColumns: ColumnDef<PurchaseOrder>[] = [
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

export default function PurchaseOrdersPage() {
  const purchaseOrders = React.useMemo(() => generatePurchaseOrders(300), []);

  const handleEdit = (row: PurchaseOrder) => {
    console.log("Edit purchase order:", row);
    // Implement edit functionality
  };

  const handleDelete = (row: PurchaseOrder) => {
    console.log("Delete purchase order:", row);
    // Implement delete functionality
  };

  const handleAdd = () => {
    console.log("Add new purchase order");
    // Implement add functionality
  };

  const handleExport = () => {
    console.log("Export purchase orders data");
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
            Purchase Order Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage purchase orders and supplier relationships (
            {purchaseOrders.length} orders)
          </p>
        </div>
      </div>

      <DataTable
        columns={purchaseOrderColumns}
        data={purchaseOrders}
        title="Purchase Order Database"
        description="Complete procurement management with supplier tracking and delivery status"
        searchKey="orderNumber"
        totalCount={purchaseOrders.length}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleExport}
      />
    </div>
  );
}
