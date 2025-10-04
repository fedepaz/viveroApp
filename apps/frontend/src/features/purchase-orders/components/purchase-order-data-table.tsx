//src/features/purchase-orders/components/purchase-order-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { purchaseOrderColumns } from "./columns";
import {
  useCreatePurchaseOrder,
  useDeletePurchaseOrder,
  usePurchaseOrders,
  useUpdatePurchaseOrder,
} from "../hooks/hooks";
import {
  PurchaseOrder,
  PurchaseOrderFormData,
  UpdatePurchaseOrderDto,
} from "../types";
import { useTranslations } from "next-intl";
import { useDataTableActions } from "@/hooks/useDataTable";
import { EntityModal } from "@/components/forms/entity-modal";
import { PurchaseOrderForm } from "./purchase-order-form";

export function PurchaseOrdersDataTable() {
  const t = useTranslations("PurchaseOrderDataTable");
  const { data: purchaseOrders = [] } = usePurchaseOrders();

  const createPurchaseOrder = useCreatePurchaseOrder();
  const updatePurchaseOrder = useUpdatePurchaseOrder();
  const deletePurchaseOrder = useDeletePurchaseOrder();

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
  } = useDataTableActions<PurchaseOrder>({
    entityName: "Purchase Orders",
    onDelete: (id) => deletePurchaseOrder.mutateAsync(id),
  });

  const handleCreateSubmit = async (data: PurchaseOrderFormData) => {
    await createPurchaseOrder.mutateAsync(data);
    closeCreateModal();
  };

  const handleEditSubmit = async (data: UpdatePurchaseOrderDto) => {
    if (selectedEntity) {
      await updatePurchaseOrder.mutateAsync({
        id: selectedEntity.id,
        purchaseOrderUpdate: data,
      });
      closeEditModal();
    }
  };

  return (
    <>
      <DataTable
        columns={purchaseOrderColumns}
        data={purchaseOrders}
        title={t("title")}
        description={t("description")}
        searchKey="orderNumber"
        totalCount={purchaseOrders.length}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={() => handleExport(purchaseOrders)}
      />

      {/* Create Modal */}
      <EntityModal
        open={isCreateModalOpen}
        onOpenChange={closeCreateModal}
        title={t("createTitle")}
        description={t("createDescription")}
      >
        <PurchaseOrderForm
          onSubmit={handleCreateSubmit}
          onCancel={closeCreateModal}
          isSubmitting={createPurchaseOrder.isPending}
        />
      </EntityModal>

      {/* Edit Modal */}
      <EntityModal
        open={isEditModalOpen}
        onOpenChange={closeEditModal}
        title={t("editTitle")}
        description={t("editDescription")}
      >
        <PurchaseOrderForm
          initialData={selectedEntity || undefined}
          onSubmit={handleEditSubmit}
          onCancel={closeEditModal}
          isSubmitting={updatePurchaseOrder.isPending}
        />
      </EntityModal>
    </>
  );
}
