import { DataTableSkeleton } from "@/components/data-display/data-table";
import { UsersDashboard } from "@/features/users";
import { userColumns } from "@/features/users/components/columns";
import { setRequestLocale } from "next-intl/server";
import { Suspense, use } from "react";

interface UsersPageProps {
  params: Promise<{ locale: string }>;
}

export default function UsersPage({ params }: UsersPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={userColumns.length} />}>
      <UsersDashboard />
    </Suspense>
  );
}
