//src/features/users/components/user-data-table.tsx
"use client";

import { useDataTableActions } from "@/hooks/useDataTable";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "../hooks/hooks";
import { CreateUserDto, UpdateUserDto, User } from "../types";
import { useTranslations } from "next-intl";
import { DataTable } from "@/components/data-display/data-table";
import { EntityModal } from "@/components/forms/entity-modal";
import { userColumns } from "./columns";
import { UserForm } from "./user-form";

export function UsersDataTable() {
  const { data: users = [] } = useUsers();
  const t = useTranslations("UsersDataTable");

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
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
  } = useDataTableActions<User>({
    entityName: "Users",
    onDelete: (id) => deleteUser.mutateAsync(id),
  });

  const handleCreateSubmit = async (data: CreateUserDto) => {
    await createUser.mutateAsync(data);
    closeCreateModal();
  };

  const handleEditSubmit = async (data: UpdateUserDto) => {
    if (selectedEntity) {
      await updateUser.mutateAsync({
        id: selectedEntity.id,
        userUpdate: data,
      });
      closeEditModal();
    }
  };

  return (
    <>
      <DataTable
        columns={userColumns}
        data={users}
        title={t("title")}
        description={t("description")}
        searchKey="name"
        totalCount={users.length}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={() => handleExport(users)}
      />

      {/* Create Modal */}
      <EntityModal
        open={isCreateModalOpen}
        onOpenChange={closeCreateModal}
        title={t("createTitle")}
        description={t("createDescription")}
      >
        <UserForm
          onSubmit={handleCreateSubmit}
          onCancel={closeCreateModal}
          isSubmitting={createUser.isPending}
        />
      </EntityModal>

      {/* Edit Modal */}
      <EntityModal
        open={isEditModalOpen}
        onOpenChange={closeEditModal}
        title={t("editTitle")}
        description={t("editDescription")}
      >
        <UserForm
          initialData={selectedEntity || undefined}
          onSubmit={handleEditSubmit}
          onCancel={closeEditModal}
          isSubmitting={updateUser.isPending}
        />
      </EntityModal>
    </>
  );
}
