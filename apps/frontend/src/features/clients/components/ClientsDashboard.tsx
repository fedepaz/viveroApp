"use client";

import { Suspense } from "react";
import {
  DataTable,
  DataTableSkeleton,
} from "@/components/data-display/data-table";
import { clientColumns } from "./columns";
import { Client } from "../types";
import { useClients } from "../hooks/hooks";
import ClientsKPI from "./clients-kpi";
import { KPICardSkeleton } from "@/components/data-display/kpi-card";

export function ClientsDashboard() {
  const { data: clients } = useClients();
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

  // TODO: When implement the data fetching, remove this conditional rendering

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <KPICardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ClientsKPI />
      </Suspense>

      <Suspense
        fallback={<DataTableSkeleton columnCount={clientColumns.length} />}
      >
        <DataTable
          columns={clientColumns}
          data={clients}
          title="User Database"
          description="Complete user management with roles, permissions, and activity tracking"
          searchKey="name"
          totalCount={clients.length}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
        />
      </Suspense>
    </div>
  );
}
