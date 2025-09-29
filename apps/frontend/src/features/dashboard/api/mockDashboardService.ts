//src/features/dashboard/api/mockDashboardService.ts

import {
  CriticalAlertInterface,
  MetricsInterface,
  EnvironmentalDataInterface,
} from "../types";

// Mock data - in production this would come from your API
const mockDashboardData = {
  metrics: {
    totalPlants: 12847,
    healthyPlants: 11203,
    plantsNeedingAttention: 1456,
    criticalAlerts: 188,
    averageTemperature: 22.3,
    averageHumidity: 68.5,
    harvestReadyCount: 2341,
    productionEfficiency: 94.2,
  },
  environmentalData: {
    greenhouse: {
      id: "gh-001",
      name: "Main Production Facility",
      sections: [
        {
          id: "section-a",
          name: "Section A",
          sensors: {
            temperature: {
              current: 22.3,
              optimal: { min: 18, max: 24 },
              trend: "stable" as const,
              history: [],
            },
            humidity: {
              current: 68.5,
              optimal: { min: 60, max: 75 },
              trend: "rising" as const,
            },
            light: {
              current: 15000,
              dailyTotal: 180000,
              spectrum: "full" as const,
            },
          },
        },
      ],
    },
    alertThresholds: {
      temperature: { warning: 26, critical: 30 },
      humidity: { warning: 80, critical: 90 },
    },
  },
  criticalAlerts: [
    {
      id: "alert-001",
      type: "temperature" as const,
      severity: "critical" as const,
      messageKey: "temperatureHigh",
      location: "Greenhouse B - Section 3",
      timestamp: new Date(),
      plantCount: 45,
    },
    {
      id: "alert-002",
      type: "pest" as const,
      severity: "high" as const,
      messageKey: "pestInfestation",
      location: "Greenhouse A - Section 1",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      plantCount: 120,
    },
    {
      id: "alert-003",
      type: "humidity" as const,
      severity: "medium" as const,
      messageKey: "humidityHigh",
      location: "Greenhouse C - Section 2",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      plantCount: 78,
    },
  ],
};
// Replace with your actual API call
// For example, you could fetch data from an API endpoint
// for now we'll just return mock data

export const mockDashboardService = {
  async fetchCriticalAlerts(): Promise<CriticalAlertInterface[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //Replace with your actual API call
    // Simulate receiving data from the API
    return mockDashboardData.criticalAlerts;
  },
  async fetchMetrics(): Promise<MetricsInterface> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //Replace with your actual API call
    // Simulate receiving data from the API
    return mockDashboardData.metrics;
  },
  async fetchEnvironmentalData(): Promise<EnvironmentalDataInterface> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //Replace with your actual API call
    // Simulate receiving data from the API
    return mockDashboardData.environmentalData;
  },
};
