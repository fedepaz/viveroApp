//src/features/plant-management/api/mockPlantStatusOverviewService.ts

import {
  RecentActivityInterface,
  StatusBreakdownInterface,
  totalPlantsInterface,
  UpcomingTasksInterface,
} from "@/features/plant-management/types";

const totalPlants: totalPlantsInterface = {
  totalPlants: 12847,
};

const statusBreakdown: StatusBreakdownInterface = {
  healthy: 11203,
  warning: 1456,
  critical: 188,
};

const recentActivity: RecentActivityInterface[] = [
  {
    id: "1",
    action: "Temperature logged",
    plant: "Tulip Batch #A-2341",
    location: "Greenhouse A, Section 2",
    timestamp: "2 minutes ago",
    status: "healthy" as const,
  },
  {
    id: "2",
    action: "Pest alert reported",
    plant: "Daffodil Batch #B-1205",
    location: "Greenhouse B, Section 1",
    timestamp: "15 minutes ago",
    status: "critical" as const,
  },
  {
    id: "3",
    action: "Growth stage updated",
    plant: "Hyacinth Batch #C-0987",
    location: "Greenhouse C, Section 3",
    timestamp: "32 minutes ago",
    status: "healthy" as const,
  },
  {
    id: "4",
    action: "Harvest completed",
    plant: "Crocus Batch #A-1876",
    location: "Greenhouse A, Section 1",
    timestamp: "1 hour ago",
    status: "harvest-ready" as const,
  },
];

const upcomingTasks: UpcomingTasksInterface[] = [
  {
    id: "1",
    task: "Weekly inspection",
    dueTime: "In 2 hours",
    plantCount: 450,
    priority: "high" as const,
  },
  {
    id: "2",
    task: "Fertilizer application",
    dueTime: "Tomorrow 9:00 AM",
    plantCount: 1200,
    priority: "medium" as const,
  },
  {
    id: "3",
    task: "Harvest scheduling",
    dueTime: "Tomorrow 2:00 PM",
    plantCount: 340,
    priority: "low" as const,
  },
];

// Replace this with your actual API call
// For example, you could fetch data from an API endpoint
// for now we'll just return mock data

export const mockPlantStatusOverviewService = {
  async fetchTotalPlants(): Promise<totalPlantsInterface> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //Replace with your actual API call
    // Simulate receiving data from the API
    return totalPlants;
  },
  async fetchStatusBreakdown(): Promise<StatusBreakdownInterface> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //Replace with your actual API call
    // Simulate receiving data from the API
    return statusBreakdown;
  },
  async fetchRecentActivity(): Promise<RecentActivityInterface[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //Replace with your actual API call
    // Simulate receiving data from the API
    return recentActivity;
  },
  async fetchUpcomingTasks(): Promise<UpcomingTasksInterface[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //Replace with your actual API call
    // Simulate receiving data from the API
    return upcomingTasks;
  },
};
