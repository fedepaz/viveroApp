// src/features/dashboard/components/feature-navigation.tsx

import { FeatureCard } from "@/components/data-display/feature-card";
import {
  Sprout,
  Users,
  FileText,
  ShoppingCart,
  UserCircle,
} from "lucide-react";
import { useDashboardKPIs } from "../hooks/hooks";

function FeatureNavigation() {
  const { data: kpis } = useDashboardKPIs();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        title="Plant Management"
        description="Manage your plant inventory and lifecycle"
        icon={Sprout}
        href="/plants"
        stats={{
          label: "active plants",
          value: kpis.activePlants.toLocaleString(),
        }}
      />
      <FeatureCard
        title="Client Management"
        description="Track and manage client relationships"
        icon={Users}
        href="/clients"
        stats={{ label: "active clients", value: kpis.activeClients }}
      />
      <FeatureCard
        title="Invoices"
        description="Create and track invoices"
        icon={FileText}
        href="/invoices"
        stats={{ label: "open invoices", value: kpis.openInvoices }}
      />
      <FeatureCard
        title="Purchase Orders"
        description="Manage purchase orders and suppliers"
        icon={ShoppingCart}
        href="/purchase-orders"
        stats={{ label: "pending orders", value: kpis.pendingOrders }}
      />
      <FeatureCard
        title="User Management"
        description="Manage system users and permissions"
        icon={UserCircle}
        href="/users"
        stats={{ label: "active users", value: kpis.activeUsers }}
      />
    </div>
  );
}

export default FeatureNavigation;
