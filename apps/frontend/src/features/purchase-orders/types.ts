export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  items: number;
  totalAmount: number;
  status: "pending" | "approved" | "delivered" | "cancelled";
  orderDate: string;
  deliveryDate: string;
}
