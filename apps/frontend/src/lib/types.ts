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

export interface EnvironmentalData {
  greenhouse: {
    id: string;
    name: string;
    sections: Array<{
      id: string;
      name: string;
      sensors: {
        temperature: {
          current: number;
          optimal: { min: number; max: number };
          trend: "rising" | "falling" | "stable";
          history: Array<{ timestamp: Date; value: number }>;
        };
        humidity: {
          current: number;
          optimal: { min: number; max: number };
          trend: "rising" | "falling" | "stable";
        };
        light: {
          current: number; // lux
          dailyTotal: number;
          spectrum: "full" | "red" | "blue" | "mixed";
        };
      };
    }>;
  };
  alertThresholds: {
    temperature: { warning: number; critical: number };
    humidity: { warning: number; critical: number };
  };
}

export interface DashboardMetrics {
  totalPlants: number;
  healthyPlants: number;
  plantsNeedingAttention: number;
  criticalAlerts: number;
  averageTemperature: number;
  averageHumidity: number;
  harvestReadyCount: number;
  productionEfficiency: number;
}
