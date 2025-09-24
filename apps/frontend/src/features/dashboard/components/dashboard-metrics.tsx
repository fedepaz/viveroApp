"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Thermometer,
  Droplets,
  Star,
  BarChart3,
} from "lucide-react";
import type { DashboardMetricsInterface as MetricsType } from "@/features/dashboard";
import { useTranslations } from "next-intl";

interface DashboardMetricsProps {
  metrics: MetricsType;
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  const t = useTranslations("metrics");

  const metricCards = [
    {
      title: t("totalPlants"),
      value: metrics.totalPlants.toLocaleString(),
      icon: BarChart3,
      trend: "+2.3%",
      trendUp: true,
      description: t("activePlants"),
    },
    {
      title: t("healthyPlants"),
      value: metrics.healthyPlants.toLocaleString(),
      icon: CheckCircle,
      trend: "+1.8%",
      trendUp: true,
      description: `${(
        (metrics.healthyPlants / metrics.totalPlants) *
        100
      ).toFixed(1)}% ${t("ofTotal")}`,
      color: "text-green-600",
    },
    {
      title: t("needAttention"),
      value: metrics.plantsNeedingAttention.toLocaleString(),
      icon: AlertTriangle,
      trend: "-0.5%",
      trendUp: false,
      description: t("plantsRequiringCare"),
      color: "text-yellow-600",
    },
    {
      title: t("criticalAlerts"),
      value: metrics.criticalAlerts.toString(),
      icon: AlertTriangle,
      trend: "+12",
      trendUp: true,
      description: t("immediateAttention"),
      color: "text-red-600",
    },
    {
      title: t("avgTemperature"),
      value: `${metrics.averageTemperature}°C`,
      icon: Thermometer,
      trend: t("stable"),
      trendUp: null,
      description: t("acrossGreenhouses"),
      color: "text-blue-600",
    },
    {
      title: t("avgHumidity"),
      value: `${metrics.averageHumidity}%`,
      icon: Droplets,
      trend: "+2.1%",
      trendUp: true,
      description: t("optimalRange"),
      color: "text-cyan-600",
    },
    {
      title: t("harvestReady"),
      value: metrics.harvestReadyCount.toLocaleString(),
      icon: Star,
      trend: "+156",
      trendUp: true,
      description: t("readyForHarvest"),
      color: "text-yellow-600",
    },
    {
      title: t("efficiency"),
      value: `${metrics.productionEfficiency}%`,
      icon: TrendingUp,
      trend: "+0.8%",
      trendUp: true,
      description: t("productionEfficiency"),
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metricCards.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="agricultural-touch-target">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon
                className={`h-4 w-4 ${metric.color || "text-muted-foreground"}`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {metric.trendUp !== null && (
                  <>
                    {metric.trendUp ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={
                        metric.trendUp ? "text-green-600" : "text-red-600"
                      }
                    >
                      {metric.trend}
                    </span>
                  </>
                )}
                <span>{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
