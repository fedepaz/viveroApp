//src/features/plants/components/PlantsDashboard.tsx

"use client";

import React from "react";
import { DataTable } from "@/components/data-display/data-table";
import { Plant } from "../types";
import { plantColumns } from "./columns";
import { usePlants } from "../hooks/hooks";

export function PlantsDashboard() {
  const { data: plants } = usePlants();
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
    <div className="container mx-auto py-8 space-y-8">
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
