//src/features/data-table/components/data-table-grid.tsx
"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Database } from "lucide-react";
import { useDataTables } from "../hooks/hooks";

export function TablesGrid() {
  const { data: tableTypes } = useDataTables();

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6" />
            Data Management Dashboard
          </h2>
        </div>
      </div>

      {/* Table Types Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {tableTypes.map((table, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group"
          >
            <CardHeader className={`${table.bgColor} rounded-t-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <table.icon className={`h-8 w-8 ${table.color}`} />
                  <div>
                    <CardTitle className="text-xl">{table.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {table.count} records
                    </Badge>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <CardDescription className="text-base">
                {table.description}
              </CardDescription>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Key Features:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {table.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${table.color.replace("text-", "bg-")}`}
                      />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <Link href={table.href}>
                <Button
                  className="w-full mt-4 bg-transparent"
                  variant="outline"
                >
                  View {table.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
