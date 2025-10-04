//src/features/clients/components/clients-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { clientColumns } from "./columns";
import { useClients } from "../hooks/hooks";
import { Client } from "../types";
import { useTranslations } from "next-intl";

export function ClientsDataTable() {
  const t = useTranslations("ClientsDataTable");
  const { data: clients = [] } = useClients();

  //const createUser = useCreateUser();
  //const updateUser = useUpdateUser();
  //const deleteUser = useDeleteUser();

  const handleEdit = (row: Client) => {
    console.log("Edit user:", row);
    // Implement edit functionality
  };

  const handleDelete = (row: Client) => {
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
      columns={clientColumns}
      data={clients}
      title={t("title")}
      description={t("description")}
      searchKey="name"
      searchPlaceholder={t("searchPlaceholder")}
      totalCount={clients.length}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onExport={handleExport}
    />
  );
}
