export interface Plant {
  id: string;
  name: string;
  type: "tulip" | "daffodil" | "hyacinth" | "crocus";
  variety: string;
  status:
    | "planted"
    | "germinating"
    | "growing"
    | "flowering"
    | "harvesting"
    | "harvested";
  plantedDate: Date;
  expectedHarvestDate: Date;
  currentTemperature: number;
  humidity: number;
  location: {
    greenhouse: string;
    section: string;
    row: number;
    position: number;
  };
  healthScore: number; // 0-100
  alerts: Array<{
    type: "temperature" | "humidity" | "pest" | "disease" | "growth";
    severity: "low" | "medium" | "high" | "critical";
    message: string;
    timestamp: Date;
  }>;
}
