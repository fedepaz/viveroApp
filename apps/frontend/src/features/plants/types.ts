export interface Plant {
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
