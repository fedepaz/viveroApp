//src/features/plants/components/plants-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { plantColumns } from "./columns";
import { usePlants } from "../hooks/hooks";
import { Plant } from "../types";

export function PlantsDataTable() {
  const { data: plants = [] } = usePlants();

  //const createPlant = useCreatePlant();
  //const updatePlant = useUpdatePlant();
  //const deletePlant = useDeletePlant();

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
  );
}
