//src/features/invoices/components/InvoicesDashboard.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import React from "react";
import { Invoice } from "../types";
import { invoiceColumns } from "./columns";
import { useInvoices } from "../hooks/hooks";

export function InvoicesDashboard() {
  const { data: invoices } = useInvoices();
  //const createInvoice = useCreateInvoice();
  //const updateInvoice = useUpdateInvoice();
  //const deleteInvoice = useDeleteInvoice();

  const handleEdit = (row: Invoice) => {
    console.log("Edit invoice:", row);
    //console.log(updateInvoice);
    // Implement edit functionality
  };

  const handleDelete = (row: Invoice) => {
    console.log("Delete invoice:", row);
    //console.log(deleteInvoice);
    // Implement delete functionality
  };

  const handleAdd = () => {
    console.log("Add new invoice");
    //console.log(createInvoice);
    // Implement add functionality
  };

  const handleExport = () => {
    console.log("Export invoices data");
    // Implement export functionality
  };

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
