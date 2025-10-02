//src/features/purchase-orders/components/purchase-orders-kpi.tsx
"use client";

import { KPICard } from "@/components/data-display/kpi-card";
import { usePurchaseOrders } from "../hooks/hooks";
import { ShoppingCart, Package, Clock, CheckCircle2 } from "lucide-react";

function PurchaseOrderKPIs() {
  const { data: purchaseOrders = [] } = usePurchaseOrders();
  const totalOrders = purchaseOrders.length;
  const totalSpend = purchaseOrders.reduce(
    (sum, po) => sum + po.totalAmount,
    0
  );
  const pendingOrders = purchaseOrders.filter(
    (po) => po.status === "pending"
  ).length;
  const receivedOrders = purchaseOrders.filter(
    (po) => po.status === "received"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Orders"
        value={totalOrders}
        description="All time"
        icon={ShoppingCart}
        trend={{ value: 10.5, label: "from last month", isPositive: true }}
      />
      <KPICard
        title="Total Spend"
        value={`€${(totalSpend / 1000).toFixed(1)}k`}
        description="From all orders"
        icon={Package}
        trend={{ value: 12.8, label: "from last month", isPositive: false }}
      />
      <KPICard
        title="Pending Approval"
        value={pendingOrders}
        description="Awaiting review"
        icon={Clock}
      />
      <KPICard
        title="Received"
        value={receivedOrders}
        description="Completed orders"
        icon={CheckCircle2}
      />
    </div>
  );
}

export default PurchaseOrderKPIs;
