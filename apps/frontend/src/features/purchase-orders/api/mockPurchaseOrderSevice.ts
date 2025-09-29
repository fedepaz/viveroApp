//src/features/purchase-orders/api/mockPurchaseOrderSevice.ts

import {
  PurchaseOrder,
  CreatePurchaseOrderDto,
  UpdatePurchaseOrderDto,
} from "../types";

const generatePurchaseOrders = (count: number): PurchaseOrder[] => {
  const statuses: PurchaseOrder["status"][] = [
    "pending",
    "approved",
    "delivered",
    "cancelled",
  ];
  const suppliers = [
    "Seeds & Supplies Co",
    "Agricultural Equipment Ltd",
    "Fertilizer Direct",
    "Packaging Solutions",
    "Transport Services",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `po-${i + 1}`,
    orderNumber: `PO-${String(i + 1).padStart(4, "0")}`,
    supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
    items: Math.floor(Math.random() * 50) + 1,
    totalAmount: Math.round((Math.random() * 50000 + 1000) * 100) / 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    deliveryDate: new Date(
      Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
  }));
};
// Replace with your actual API call
// For example, you could fetch purchase orders from a database or an API endpoint
// For now we'll just generate some mock data

export const mockPurchaseOrderSevice = {
  async fetchPurchaseOrders(): Promise<PurchaseOrder[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with purchase orders
    // Simulate receiving purchase orders from the API
    return generatePurchaseOrders(300);
  },

  async fetchPurchaseOrderById(id: string): Promise<PurchaseOrder | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with purchase order
    // Simulate receiving purchase order from the API
    const purchaseOrders = generatePurchaseOrders(500);
    return (
      purchaseOrders.find((purchaseOrder) => purchaseOrder.id === id) || null
    );
  },

  async createPurchaseOrder(
    purchaseOrderCreate: CreatePurchaseOrderDto
  ): Promise<PurchaseOrder> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with purchase order
    // Simulate creating purchase order in the database
    return {
      ...purchaseOrderCreate,
      id: `purchaseOrder-${Date.now()}`,
    };
  },

  async updatePurchaseOrder(
    id: string,
    purchaseOrderUpdate: UpdatePurchaseOrderDto
  ): Promise<PurchaseOrder> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with purchase order
    // Simulate updating purchase order in the database
    const purchaseOrders = generatePurchaseOrders(500);
    const existingPurchaseOrder = purchaseOrders.find(
      (purchaseOrder) => purchaseOrder.id === id
    );
    if (!existingPurchaseOrder) throw new Error("Purchase order not found");
    return { ...existingPurchaseOrder, ...purchaseOrderUpdate };
  },

  //async deletePurchaseOrder(id: string): Promise<void> {
  //  // Simulate network delay
  //  await new Promise((resolve) => setTimeout(resolve, 1500));
  //  // Replace API response with purchase order
  //  // Simulate deleting purchase order from the database
  //},
};
