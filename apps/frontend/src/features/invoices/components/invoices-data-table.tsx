//src/features/invoices/components/invoices-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { invoiceColumns } from "./columns";
import {
  useCreateInvoice,
  useDeleteInvoice,
  useInvoices,
  useUpdateInvoice,
} from "../hooks/hooks";
import { Invoice, InvoiceFormData, UpdateInvoiceDto } from "../types";
import { useDataTableActions } from "@/hooks/useDataTable";
import { useTranslations } from "next-intl";
import { EntityModal } from "@/components/forms/entity-modal";
import { InvoiceForm } from "./invoice-form";

export function InvoicesDataTable() {
  const { data: invoices = [] } = useInvoices();
  const t = useTranslations("InvoicesDataTable");

  const createInvoice = useCreateInvoice();
  const updateInvoice = useUpdateInvoice();
  const deleteInvoice = useDeleteInvoice();
  const {
    isCreateModalOpen,
    isEditModalOpen,
    selectedEntity,
    handleAdd,
    handleEdit,
    handleDelete,
    handleExport,
    closeCreateModal,
    closeEditModal,
  } = useDataTableActions<Invoice>({
    entityName: "Invoices",
    onDelete: (id) => deleteInvoice.mutateAsync(id),
  });

  const handleCreateSubmit = async (data: InvoiceFormData) => {
    await createInvoice.mutateAsync(data);
    closeCreateModal();
  };

  const handleEditSubmit = async (data: UpdateInvoiceDto) => {
    if (selectedEntity) {
      await updateInvoice.mutateAsync({
        id: selectedEntity.id,
        invoiceUpdate: data,
      });
      closeEditModal();
    }
  };

  return (
    <>
      <DataTable
        columns={invoiceColumns}
        data={invoices}
        title={t("title")}
        description={t("description")}
        searchKey="invoiceNumber"
        totalCount={invoices.length}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={() => handleExport(invoices)}
      />

      {/* Create Modal */}
      <EntityModal
        open={isCreateModalOpen}
        onOpenChange={closeCreateModal}
        title={t("createTitle")}
        description={t("createDescription")}
      >
        <InvoiceForm
          onSubmit={handleCreateSubmit}
          onCancel={closeCreateModal}
          isSubmitting={createInvoice.isPending}
        />
      </EntityModal>

      {/* Edit Modal */}
      <EntityModal
        open={isEditModalOpen}
        onOpenChange={closeEditModal}
        title={t("editTitle")}
        description={t("editDescription")}
      >
        <InvoiceForm
          initialData={selectedEntity || undefined}
          onSubmit={handleEditSubmit}
          onCancel={closeEditModal}
          isSubmitting={updateInvoice.isPending}
        />
      </EntityModal>
    </>
  );
}
