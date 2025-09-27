"use client";

import { DataTable } from "@/components/data-display/data-table";
import React from "react";
import { Invoice } from "../types";
import { invoiceColumns } from "./columns";
import { useIsMounted } from "@/hooks/useIsMounted";
import { LoadingSpinner } from "@/components/common/loading-spinner";

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

export function InvoicesDashboard() {
  const isMounted = useIsMounted();
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

  // TODO: When implement the data fetching, remove this conditional rendering
  if (!isMounted) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-8 space-y-8">
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
