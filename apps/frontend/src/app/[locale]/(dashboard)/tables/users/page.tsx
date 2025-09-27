"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, SortableHeader, StatusBadge } from "@/features/data-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "worker";
  status: "active" | "inactive";
  lastLogin: string;
  department: string;
}

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

const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Name</SortableHeader>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableHeader column={column}>Email</SortableHeader>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <SortableHeader column={column}>Role</SortableHeader>
    ),
    cell: ({ row }) => (
      <StatusBadge
        status={row.getValue("role") === "admin" ? "critical" : "info"}
      >
        {String(row.getValue("role")).charAt(0).toUpperCase() +
          String(row.getValue("role")).slice(1)}
      </StatusBadge>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column}>Status</SortableHeader>
    ),
    cell: ({ row }) => (
      <StatusBadge
        status={row.getValue("status") === "active" ? "healthy" : "inactive"}
      >
        {String(row.getValue("status")).charAt(0).toUpperCase() +
          String(row.getValue("status")).slice(1)}
      </StatusBadge>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <SortableHeader column={column}>Department</SortableHeader>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <SortableHeader column={column}>Last Login</SortableHeader>
    ),
  },
];

export default function UsersPage() {
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

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/tables">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tables
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage user accounts and permissions across your organization (
            {users.length} users)
          </p>
        </div>
      </div>

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
