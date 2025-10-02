//src/features/purchase-orders/types.ts

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  items: number;
  totalAmount: number;
  status: "pending" | "approved" | "received" | "cancelled";
  orderDate: string;
  deliveryDate: string;
}

interface CreatePurchaseOrderDto {
  orderNumber: string;
  supplier: string;
  items: number;
  totalAmount: number;
  status: "pending" | "approved" | "received" | "cancelled";
  orderDate: string;
  deliveryDate: string;
}
interface UpdatePurchaseOrderDto {
  orderNumber?: string;
  supplier?: string;
  items?: number;
  totalAmount?: number;
  status?: "pending" | "approved" | "received" | "cancelled";
  orderDate?: string;
  deliveryDate?: string;
}

export type { PurchaseOrder, CreatePurchaseOrderDto, UpdatePurchaseOrderDto };
