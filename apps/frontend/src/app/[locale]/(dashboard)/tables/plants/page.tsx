"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, SortableHeader, StatusBadge } from "@/features/data-table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Plant {
  id: string;
  name: string;
  species: string;
  location: string;
  status: "healthy" | "warning" | "critical";
  plantedDate: string;
  harvestDate: string;
  temperature: number;
  humidity: number;
}

const generatePlants = (count: number): Plant[] => {
  const species = [
    "Tomato",
    "Cucumber",
    "Lettuce",
    "Pepper",
    "Basil",
    "Spinach",
  ];
  const statuses: Plant["status"][] = ["healthy", "warning", "critical"];
  const locations = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return Array.from({ length: count }, (_, i) => ({
    id: `plant-${i + 1}`,
    name: `Plant ${i + 1}`,
    species: species[Math.floor(Math.random() * species.length)],
    location: `Greenhouse ${locations[Math.floor(Math.random() * locations.length)]}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    plantedDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    harvestDate: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    temperature: Math.round((18 + Math.random() * 8) * 10) / 10,
    humidity: Math.round((60 + Math.random() * 30) * 10) / 10,
  }));
};

const plantColumns: ColumnDef<Plant>[] = [
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
      <SortableHeader column={column}>Plant ID</SortableHeader>
    ),
  },
  {
    accessorKey: "species",
    header: ({ column }) => (
      <SortableHeader column={column}>Species</SortableHeader>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <SortableHeader column={column}>Location</SortableHeader>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column}>Health Status</SortableHeader>
    ),
    cell: ({ row }) => (
      <StatusBadge
        status={row.getValue("status") as "healthy" | "warning" | "critical"}
      >
        {String(row.getValue("status")).charAt(0).toUpperCase() +
          String(row.getValue("status")).slice(1)}
      </StatusBadge>
    ),
  },
  {
    accessorKey: "temperature",
    header: ({ column }) => (
      <SortableHeader column={column}>Temperature (°C)</SortableHeader>
    ),
    cell: ({ row }) => `${row.getValue("temperature")}°C`,
  },
  {
    accessorKey: "humidity",
    header: ({ column }) => (
      <SortableHeader column={column}>Humidity (%)</SortableHeader>
    ),
    cell: ({ row }) => `${row.getValue("humidity")}%`,
  },
  {
    accessorKey: "plantedDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Planted Date</SortableHeader>
    ),
  },
  {
    accessorKey: "harvestDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Expected Harvest</SortableHeader>
    ),
  },
];

export default function PlantsPage() {
  const plants = React.useMemo(() => generatePlants(200000), []); // Large dataset example

  const handleEdit = (row: Plant) => {
    console.log("Edit plant:", row);
    // Implement edit functionality
  };

  const handleDelete = (row: Plant) => {
    console.log("Delete plant:", row);
    // Implement delete functionality
  };

  const handleAdd = () => {
    console.log("Add new plant");
    // Implement add functionality
  };

  const handleExport = () => {
    console.log("Export plants data");
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
          <h1 className="text-4xl font-bold tracking-tight">
            Plant Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage all plants across your agricultural facilities (
            {plants.length.toLocaleString()} records)
          </p>
        </div>
      </div>

      <DataTable
        columns={plantColumns}
        data={plants}
        title="Plant Database"
        description="Complete plant inventory with health monitoring and environmental data"
        searchKey="name"
        totalCount={plants.length}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleExport}
      />
    </div>
  );
}
