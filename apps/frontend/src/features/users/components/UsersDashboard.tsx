"use client";

import * as React from "react";
import { DataTable } from "@/components/data-display/data-table";
import { useIsMounted } from "@/hooks/useIsMounted";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { User } from "../types";
import { userColumns } from "./columns";

const generateUsers = (count: number): User[] => {
  const roles: User["role"][] = ["admin", "manager", "worker"];
  const statuses: User["status"][] = ["active", "inactive"];
  const departments = [
    "Greenhouse A",
    "Greenhouse B",
    "Processing",
    "Quality Control",
    "Administration",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@agricultural.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    department: departments[Math.floor(Math.random() * departments.length)],
  }));
};

export function UsersDashboard() {
  const isMounted = useIsMounted();
  const users = React.useMemo(() => generateUsers(150), []);

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
  if (!isMounted) return <LoadingSpinner />;

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
