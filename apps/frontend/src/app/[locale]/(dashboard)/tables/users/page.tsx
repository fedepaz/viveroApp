import { UsersDashboard } from "@/features/users";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

interface UsersPageProps {
  params: Promise<{ locale: string }>;
}

export default function UsersPage({ params }: UsersPageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 space-y-6">
        <UsersDashboard />
      </main>
    </div>
  );
}