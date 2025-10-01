//src/features/dashboard/api/mockDashboardService.ts

import {
  DashboardKpiInterface,
  AlertInterface,
  RecentActivityInterface,
} from "../types";

const generateKpi = (): DashboardKpiInterface => {
  return {
    totalPlants: parseInt((Math.random() * 50000).toFixed(0)),
    activePlants: parseInt((Math.random() * 50000).toFixed(0)),
    totalClients: parseInt((Math.random() * 200).toFixed(0)),
    activeClients: parseInt((Math.random() * 200).toFixed(0)),
    openInvoices: parseInt((Math.random() * 100).toFixed(0)),
    monthlyRevenue: parseInt((Math.random() * 100000).toFixed(0)),
    pendingOrders: parseInt((Math.random() * 50).toFixed(0)),
    activeUsers: parseInt((Math.random() * 25).toFixed(0)),
  };
};

const generateAlert = (count: number): AlertInterface[] => {
  const types: AlertInterface["type"][] = ["critical", "warning", "info"];
  const messages = [
    "Limited stock",
    "Order received",
    "New client",
    "Invoice received",
    "System down",
    "User deleted",
    "Plant out of stock",
  ];

  const locations = [
    // Provinces of Argentina
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Corrientes",
    "Entre Rios",
    "Formosa",
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: `alert-${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    messageKey: messages[Math.floor(Math.random() * messages.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    timestamp: new Date(),
  }));
};

const generateRecentActivity = (count: number): RecentActivityInterface[] => {
  const actions = [
    "Plant #123 is out of stock",
    "Order #456 has been placed",
    "New client registered",
    "New invoice received",
    "System is down",
    "User deleted",
  ];

  const users = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Lee",
    "Charlie Brown",
    "David Jones",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `activity-${i + 1}`,
    action: actions[Math.floor(Math.random() * actions.length)],
    user: users[Math.floor(Math.random() * users.length)],
    timestamp: new Date(),
  }));
};
// Replace with your actual API call
// For example, you could fetch data from an API endpoint
// for now we'll just return mock data

export const mockDashboardService = {
  async fetchKPIs(): Promise<DashboardKpiInterface> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with KPIs
    // Simulate receiving KPIs from the API
    return generateKpi();
  },

  async fetchAlerts(): Promise<AlertInterface[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with alerts
    // Simulate receiving alerts from the API
    return generateAlert(3);
  },

  async fetchRecentActivity(): Promise<RecentActivityInterface[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with recent activity
    // Simulate receiving recent activity from the API
    return generateRecentActivity(4);
  },
};
