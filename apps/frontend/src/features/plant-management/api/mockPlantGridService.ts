// src/features/plants/hooks/usePlants.ts

import { PlantInterface } from "../types";

const mockPlants: PlantInterface[] = [
  {
    id: "plant-001",
    name: "Premium Red Tulips",
    type: "tulip",
    variety: "Darwin Hybrid",
    status: "flowering",
    plantedDate: new Date("2024-01-15"),
    expectedHarvestDate: new Date("2024-04-15"),
    currentTemperature: 22.5,
    humidity: 68,
    location: {
      greenhouse: "Greenhouse A",
      section: "Section 1",
      row: 5,
      position: 12,
    },
    healthScore: 92,
    alerts: [],
  },
  {
    id: "plant-002",
    name: "Golden Daffodils",
    type: "daffodil",
    variety: "King Alfred",
    status: "growing",
    plantedDate: new Date("2024-02-01"),
    expectedHarvestDate: new Date("2024-05-01"),
    currentTemperature: 28.2,
    humidity: 45,
    location: {
      greenhouse: "Greenhouse B",
      section: "Section 2",
      row: 3,
      position: 8,
    },
    healthScore: 65,
    alerts: [
      {
        type: "temperature",
        severity: "critical",
        message: "Temperature exceeds optimal range",
        timestamp: new Date(),
      },
      {
        type: "humidity",
        severity: "medium",
        message: "Low humidity detected",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "plant-003",
    name: "Purple Hyacinths",
    type: "hyacinth",
    variety: "Woodstock",
    status: "harvesting",
    plantedDate: new Date("2023-12-10"),
    expectedHarvestDate: new Date("2024-03-10"),
    currentTemperature: 21.8,
    humidity: 72,
    location: {
      greenhouse: "Greenhouse C",
      section: "Section 1",
      row: 2,
      position: 15,
    },
    healthScore: 88,
    alerts: [],
  },
  {
    id: "plant-004",
    name: "White Crocuses",
    type: "crocus",
    variety: "Jeanne d'Arc",
    status: "germinating",
    plantedDate: new Date("2024-02-20"),
    expectedHarvestDate: new Date("2024-04-20"),
    currentTemperature: 19.5,
    humidity: 78,
    location: {
      greenhouse: "Greenhouse A",
      section: "Section 3",
      row: 1,
      position: 5,
    },
    healthScore: 95,
    alerts: [],
  },
];
// Replace with your actual API call
// For example, you could fetch data from an API endpoint
// for now we'll just return mock data

export const mockPlantGridService = {
  async fetchPlants(): Promise<PlantInterface[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //Replace with your actual API call
    // Simulate receiving data from the API
    return mockPlants;
  },
};
