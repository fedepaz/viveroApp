//src/features/plants/components/plants-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { plantColumns } from "./columns";
import {
  useCreatePlant,
  useDeletePlant,
  usePlants,
  useUpdatePlant,
} from "../hooks/hooks";
import { CreatePlantDto, Plant, UpdatePlantDto } from "../types";
import { useTranslations } from "next-intl";
import { useDataTableActions } from "@/hooks/useDataTable";
import { EntityModal } from "@/components/forms/entity-modal";
import { PlantForm } from "./plants-form";

export function PlantsDataTable() {
  const { data: plants = [] } = usePlants();
  const t = useTranslations("PlantsDataTable");

  const createPlant = useCreatePlant();
  const updatePlant = useUpdatePlant();
  const deletePlant = useDeletePlant();

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
  } = useDataTableActions<Plant>({
    entityName: "Plants",
    onDelete: (id) => deletePlant.mutateAsync(id),
  });

  const handleCreateSubmit = async (data: CreatePlantDto) => {
    await createPlant.mutateAsync(data);
    closeCreateModal();
  };

  const handleEditSubmit = async (data: UpdatePlantDto) => {
    if (selectedEntity) {
      await updatePlant.mutateAsync({
        id: selectedEntity.id,
        plantUpdate: data,
      });
      closeEditModal();
    }
  };

  return (
    <>
      <DataTable
        columns={plantColumns}
        data={plants}
        title={t("title")}
        description={t("description")}
        searchKey="name"
        totalCount={plants.length}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={() => handleExport(plants)}
      />

      {/* Create Modal */}
      <EntityModal
        open={isCreateModalOpen}
        onOpenChange={closeCreateModal}
        title={t("createTitle")}
        description={t("createDescription")}
      >
        <PlantForm
          onSubmit={handleCreateSubmit}
          onCancel={closeCreateModal}
          isSubmitting={createPlant.isPending}
        />
      </EntityModal>

      {/* Edit Modal */}
      <EntityModal
        open={isEditModalOpen}
        onOpenChange={closeEditModal}
        title={t("editTitle")}
        description={t("editDescription")}
      >
        <PlantForm
          initialData={selectedEntity || undefined}
          onSubmit={handleEditSubmit}
          onCancel={closeEditModal}
          isSubmitting={updatePlant.isPending}
        />
      </EntityModal>
    </>
  );
}
