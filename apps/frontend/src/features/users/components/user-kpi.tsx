//src/features/users/components/user-kpi.tsx
"use client";

import { KPICard } from "@/components/data-display/kpi-card";
import { Users, UserCheck, UserX, Shield } from "lucide-react";
import { useUsers } from "../hooks/hooks";

function UserKPIs() {
  const { data: mockUsers = [] } = useUsers();
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter((u) => u.status === "active").length;
  const inactiveUsers = mockUsers.filter((u) => u.status === "inactive").length;
  const adminUsers = mockUsers.filter((u) => u.role === "admin").length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Users"
        value={totalUsers}
        description="In system"
        icon={Users}
        trend={{ value: 5.0, label: "from last month", isPositive: true }}
      />
      <KPICard
        title="Active Users"
        value={activeUsers}
        description={`${inactiveUsers} inactive`}
        icon={UserCheck}
      />
      <KPICard
        title="Inactive Users"
        value={inactiveUsers}
        description="Need attention"
        icon={UserX}
      />
      <KPICard
        title="Administrators"
        value={adminUsers}
        description="Full access"
        icon={Shield}
      />
    </div>
  );
}

export default UserKPIs;
