interface PlantInterface {
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

interface totalPlantsInterface {
  totalPlants: number;
}

interface StatusBreakdownInterface {
  healthy: number;
  warning: number;
  critical: number;
}

interface RecentActivityInterface {
  id: string;
  action: string;
  plant: string;
  location: string;
  timestamp: string;
  status: "healthy" | "warning" | "critical" | "harvest-ready";
}

interface UpcomingTasksInterface {
  id: string;
  task: string;
  dueTime: string;
  plantCount: number;
  priority: "high" | "medium" | "low";
}

export type {
  PlantInterface,
  totalPlantsInterface,
  StatusBreakdownInterface,
  RecentActivityInterface,
  UpcomingTasksInterface,
};
