//src/features/dashboard/types.ts

interface MetricsInterface {
  totalPlants: number;
  healthyPlants: number;
  plantsNeedingAttention: number;
  criticalAlerts: number;
  averageTemperature: number;
  averageHumidity: number;
  harvestReadyCount: number;
  productionEfficiency: number;
}
interface EnvironmentalDataInterface {
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

interface CriticalAlertInterface {
  id: string;
  type: "temperature" | "humidity" | "pest";
  severity: "high" | "medium" | "low" | "critical";
  messageKey: string;
  location: string;
  timestamp: Date;
  plantCount: number;
}

export type {
  EnvironmentalDataInterface,
  MetricsInterface,
  CriticalAlertInterface,
};
