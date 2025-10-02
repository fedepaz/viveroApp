//src/features/data-table/api/mockDataTableService.ts

import { Sprout, Users, FileText, ShoppingCart } from "lucide-react";
import { DataTableInterface } from "../types";

const dataTable: DataTableInterface[] = [
  {
    icon: Sprout,
    title: "Plant Management",
    description:
      "Monitor and manage all plants across your agricultural facilities",
    count: "200,000+",
    href: "/plants",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    features: [
      "Health monitoring",
      "Environmental data",
      "Growth tracking",
      "Harvest planning",
    ],
  },
  {
    icon: Users,
    title: "User Management",
    description:
      "Manage user accounts and permissions across your organization",
    count: "150+",
    href: "/users",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    features: [
      "Role management",
      "Access control",
      "Activity tracking",
      "Department organization",
    ],
  },
  {
    icon: FileText,
    title: "Invoice Management",
    description: "Track and manage all invoices and payments",
    count: "500+",
    href: "/invoices",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    features: [
      "Payment tracking",
      "Client management",
      "Due date alerts",
      "Financial reporting",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Purchase Orders",
    description: "Manage purchase orders and supplier relationships",
    count: "300+",
    href: "/purchase-orders",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    features: [
      "Supplier management",
      "Order tracking",
      "Delivery status",
      "Procurement analytics",
    ],
  },
];
// Replace with your actual API call
// For example, you could fetch data from an API endpoint
// for now we'll just return mock data

export const mockDataTableService = {
  async fetchDataTables(): Promise<DataTableInterface[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000)); //Replace with your actual API call
    // Simulate receiving data from the API
    return dataTable;
  },
};
