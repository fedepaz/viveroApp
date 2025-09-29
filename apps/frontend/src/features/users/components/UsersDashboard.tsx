"use client";

import * as React from "react";
import { DataTable } from "@/components/data-display/data-table";
import { User } from "../types";
import { userColumns } from "./columns";
import { useUsers } from "../hooks/hooks";

export function UsersDashboard() {
  const { data: users } = useUsers();
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

  // TODO: When implement the data fetching, remove this conditional rendering

  return (
    <div className="container mx-auto py-8 space-y-8">
      <DataTable
        columns={userColumns}
        data={users}
        title="User Database"
        description="Complete user management with roles, permissions, and activity tracking"
        searchKey="name"
        totalCount={users.length}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleExport}
      />
    </div>
  );
}
