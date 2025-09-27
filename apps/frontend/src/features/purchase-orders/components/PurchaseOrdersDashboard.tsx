"use client";

import * as React from "react";
import { DataTable } from "@/components/data-display/data-table";
import { useIsMounted } from "@/hooks/useIsMounted";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { PurchaseOrder } from "../types";
import { purchaseOrderColumns } from "./columns";

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

export function PurchaseOrdersDashboard() {
  const isMounted = useIsMounted();
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

  // TODO: When implement the data fetching, remove this conditional rendering
  if (!isMounted) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-8 space-y-8">
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
