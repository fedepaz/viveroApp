export function RootDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="h-12 w-full rounded-lg bg-muted" />
            <div className="h-6 w-full rounded-lg bg-muted" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-12 w-full rounded-lg bg-muted" />
            <div className="h-6 w-full rounded-lg bg-muted" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-12 w-full rounded-lg bg-muted" />
            <div className="h-6 w-full rounded-lg bg-muted" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-12 w-full rounded-lg bg-muted" />
            <div className="h-6 w-full rounded-lg bg-muted" />
          </div>
        </div>
      </main>
    </div>
  );
}
