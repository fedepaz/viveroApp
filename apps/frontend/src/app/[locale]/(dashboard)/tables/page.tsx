"use client";

import { TablesGrid } from "@/features/data-table";

export default function TablesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6">
        <TablesGrid />
      </main>
    </div>
  );
}
