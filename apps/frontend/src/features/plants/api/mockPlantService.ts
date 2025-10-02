//src/features/plants/api/mockPlantService.ts

import { Plant, CreatePlantDto, UpdatePlantDto } from "../types";

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
// Replace with your actual API call
// For example, you could fetch plants from a database or an API endpoint
// For now we'll just generate some mock data

export const mockPlantService = {
  async fetchPlants(): Promise<Plant[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000)); // Replace API response with plants
    // Simulate receiving plants from the API
    return generatePlants(200000);
  },

  async fetchPlantById(id: string): Promise<Plant | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with plant
    // Simulate receiving plant from the API
    const plants = generatePlants(500);
    return plants.find((plant) => plant.id === id) || null;
  },

  async createPlant(plantCreate: CreatePlantDto): Promise<Plant> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with plant
    // Simulate creating plant in the database
    return {
      ...plantCreate,
      id: `plant-${Date.now()}`,
    };
  },

  async updatePlant(id: string, plantUpdate: UpdatePlantDto): Promise<Plant> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with plant
    // Simulate updating plant in the database
    const plants = generatePlants(500);
    const existingPlant = plants.find((plant) => plant.id === id);
    if (!existingPlant) throw new Error("Plant not found");
    return { ...existingPlant, ...plantUpdate };
  },

  //async deletePlant(id: string): Promise<void> {
  //  // Simulate network delay
  //  await new Promise((resolve) => setTimeout(resolve, 1500));
  //  // Replace API response with plant
  //  // Simulate deleting plant from the database
  //},
};
