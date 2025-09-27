"use client";

import * as React from "react";
import { DataTable } from "@/components/data-display/data-table";
import { useIsMounted } from "@/hooks/useIsMounted";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Plant } from "../types";
import { plantColumns } from "./columns";

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

export function PlantsDashboard() {
  const isMounted = useIsMounted();
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

  // TODO: When implement the data fetching, remove this conditional rendering
  if (!isMounted) return <LoadingSpinner />;

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
