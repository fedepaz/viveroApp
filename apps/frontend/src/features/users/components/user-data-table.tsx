//src/features/users/components/user-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { userColumns } from "./columns";
import { useUsers } from "../hooks/hooks";
import { User } from "../types";
import { useTranslations } from "next-intl";

export function UsersDataTable() {
  const t = useTranslations("UserDataTable");
  const { data: users = [] } = useUsers();

  //const createUser = useCreateUser();
  //const updateUser = useUpdateUser();
  //const deleteUser = useDeleteUser();

  const handleEdit = (row: User) => {
    console.log("Edit user:", row);
    // Implement edit functionality
  };

  const handleDelete = (row: User) => {
    console.log("Delete user:", row);
    // Implement delete functionality
  };

  const handleAdd = () => {
    console.log("Add new user");
    // Implement add functionality
  };

  const handleExport = () => {
    console.log("Export users data");
    // Implement export functionality
  };

  return (
    <DataTable
      columns={userColumns}
      data={users}
      title={t("title")}
      description={t("description")}
      searchKey="name"
      searchPlaceholder={t("searchPlaceholder")}
      totalCount={users.length}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onExport={handleExport}
    />
  );
}
