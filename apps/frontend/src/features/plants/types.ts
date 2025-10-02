interface Plant {
  id: string;
  name: string;
  species: string;
  location: string;
  status: "healthy" | "warning" | "critical" | "harvested";
  growthStage: string;
  plantedDate: string;
  lastWatered: string;
}

interface CreatePlantDto {
  name: string;
  species: string;
  location: string;
  status: "healthy" | "warning" | "critical" | "harvested";
  growthStage: string;
  plantedDate: string;
  lastWatered: string;
}
interface UpdatePlantDto {
  name?: string;
  species?: string;
  location?: string;
  status?: "healthy" | "warning" | "critical" | "harvested";
  growthStage?: string;
  plantedDate?: string;
  lastWatered?: string;
}

export type { Plant, CreatePlantDto, UpdatePlantDto };
