//src/features/clients/components/clients-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { clientColumns } from "./columns";
import {
  useClients,
  useCreateClient,
  useDeleteClient,
  useUpdateClient,
} from "../hooks/hooks";
import { Client, ClientFormData, UpdateClientDto } from "../types";
import { useTranslations } from "next-intl";
import { useDataTableActions } from "@/hooks/useDataTable";
import { EntityModal } from "@/components/forms/entity-modal";
import { ClientForm } from "./client-form";

export function ClientsDataTable() {
  const t = useTranslations("ClientsDataTable");
  const { data: clients = [] } = useClients();

  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

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
  } = useDataTableActions<Client>({
    entityName: "Clients",
    onDelete: (id) => deleteClient.mutateAsync(id),
  });

  const handleCreateSubmit = async (data: ClientFormData) => {
    await createClient.mutateAsync(data);
    closeCreateModal();
  };

  const handleEditSubmit = async (data: UpdateClientDto) => {
    if (selectedEntity) {
      await updateClient.mutateAsync({
        id: selectedEntity.id,
        clientUpdate: data,
      });
      closeEditModal();
    }
  };

  return (
    <>
      <DataTable
        columns={clientColumns}
        data={clients}
        title={t("title")}
        description={t("description")}
        searchKey="name"
        totalCount={clients.length}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={() => handleExport(clients)}
      />

      {/* Create Modal */}
      <EntityModal
        open={isCreateModalOpen}
        onOpenChange={closeCreateModal}
        title={t("createTitle")}
        description={t("createDescription")}
      >
        <ClientForm
          onSubmit={handleCreateSubmit}
          onCancel={closeCreateModal}
          isSubmitting={createClient.isPending}
        />
      </EntityModal>

      {/* Edit Modal */}
      <EntityModal
        open={isEditModalOpen}
        onOpenChange={closeEditModal}
        title={t("editTitle")}
        description={t("editDescription")}
      >
        <ClientForm
          initialData={selectedEntity || undefined}
          onSubmit={handleEditSubmit}
          onCancel={closeEditModal}
          isSubmitting={updateClient.isPending}
        />
      </EntityModal>
    </>
  );
}
