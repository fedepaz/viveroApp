//src/features/invoices/components/invoices-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { invoiceColumns } from "./columns";
import { useInvoices } from "../hooks/hooks";
import { Invoice } from "../types";

export function InvoicesDataTable() {
  const { data: invoices = [] } = useInvoices();

  //const createInvoice = useCreateInvoice();
  //const updateInvoice = useUpdateInvoice();
  //const deleteInvoice = useDeleteInvoice();

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
  );
}
