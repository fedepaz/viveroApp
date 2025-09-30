// src/features/data-table/components/data-table-grid-skeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DataTableGridSkeleton() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-8 w-64" />
        </div>
      </div>

      {/* Table Types Grid Skeleton */}
      <div className="grid md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardHeader className="rounded-t-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="grid grid-cols-2 gap-2">
                  {[...Array(4)].map((_, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <Skeleton className="w-2 h-2 rounded-full" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <Skeleton className="w-full h-10 mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
