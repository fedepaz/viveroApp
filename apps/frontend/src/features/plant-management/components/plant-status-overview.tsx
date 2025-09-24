"use client";

import { Progress } from "@radix-ui/react-progress";
import { Filter, MoreHorizontal, Eye } from "lucide-react";

import { PlantStatusIndicator } from "@/features/plant-management";
import { useTranslations } from "next-intl"; // Import useTranslations
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Mock data for plant status overview
const plantStatusData = {
  totalPlants: 12847,
  statusBreakdown: {
    healthy: 11203,
    warning: 1456,
    critical: 188,
  },
  recentActivity: [
    {
      id: "1",
      action: "Temperature logged",
      plant: "Tulip Batch #A-2341",
      location: "Greenhouse A, Section 2",
      timestamp: "2 minutes ago",
      status: "healthy" as const,
    },
    {
      id: "2",
      action: "Pest alert reported",
      plant: "Daffodil Batch #B-1205",
      location: "Greenhouse B, Section 1",
      timestamp: "15 minutes ago",
      status: "critical" as const,
    },
    {
      id: "3",
      action: "Growth stage updated",
      plant: "Hyacinth Batch #C-0987",
      location: "Greenhouse C, Section 3",
      timestamp: "32 minutes ago",
      status: "healthy" as const,
    },
    {
      id: "4",
      action: "Harvest completed",
      plant: "Crocus Batch #A-1876",
      location: "Greenhouse A, Section 1",
      timestamp: "1 hour ago",
      status: "harvest-ready" as const,
    },
  ],
  upcomingTasks: [
    {
      id: "1",
      task: "Weekly inspection",
      dueTime: "In 2 hours",
      plantCount: 450,
      priority: "high" as const,
    },
    {
      id: "2",
      task: "Fertilizer application",
      dueTime: "Tomorrow 9:00 AM",
      plantCount: 1200,
      priority: "medium" as const,
    },
    {
      id: "3",
      task: "Harvest scheduling",
      dueTime: "Tomorrow 2:00 PM",
      plantCount: 340,
      priority: "low" as const,
    },
  ],
};

export function PlantStatusOverview() {
  const { totalPlants, statusBreakdown, recentActivity, upcomingTasks } =
    plantStatusData;
  const t = useTranslations("metrics"); // Initialize useTranslations
  const tCommon = useTranslations("common"); // For common phrases like "minutes ago"

  const healthyPercentage = (statusBreakdown.healthy / totalPlants) * 100;
  const warningPercentage = (statusBreakdown.warning / totalPlants) * 100;
  const criticalPercentage = (statusBreakdown.critical / totalPlants) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    // This is a simplified example. In a real app, you'd use date-fns or similar
    // to properly format and localize time differences.
    if (timestamp.includes("minutes ago")) {
      const minutes = parseInt(timestamp.split(" ")[0]);
      return tCommon("minutesAgo", { count: minutes });
    }
    if (timestamp.includes("hour ago")) {
      const hours = parseInt(timestamp.split(" ")[0]);
      return tCommon("hourAgo", { count: hours });
    }
    if (timestamp.includes("In ")) {
      const hours = parseInt(timestamp.split(" ")[1]);
      return tCommon("inXHours", { count: hours });
    }
    if (timestamp.includes("Tomorrow ")) {
      const time = timestamp.split(" ")[1];
      return tCommon("tomorrowAt", { time: time });
    }
    return timestamp; // Fallback for other formats
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg">{t("title")}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {t("totalPlants", { count: totalPlants.toLocaleString() })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Distribution */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <PlantStatusIndicator status="healthy" size="sm" />
              <span>{t("healthyPlants")}</span>
            </div>
            <span className="font-medium">
              {statusBreakdown.healthy.toLocaleString()}
            </span>
          </div>
          <Progress value={healthyPercentage} className="h-2" />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <PlantStatusIndicator status="warning" size="sm" />
              <span>{t("needAttention")}</span>
            </div>
            <span className="font-medium">
              {statusBreakdown.warning.toLocaleString()}
            </span>
          </div>
          <Progress value={warningPercentage} className="h-2" />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <PlantStatusIndicator status="critical" size="sm" />
              <span>{t("criticalIssues")}</span>
            </div>
            <span className="font-medium">
              {statusBreakdown.critical.toLocaleString()}
            </span>
          </div>
          <Progress value={criticalPercentage} className="h-2" />
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-medium mb-3">{t("recentActivity")}</h4>
          <div className="space-y-3">
            {recentActivity.slice(0, 3).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 text-sm"
              >
                <PlantStatusIndicator status={activity.status} size="sm" />
                <div className="flex-1 min-w-0"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <h4 className="text-sm font-medium mb-3">{t("upcomingTasks")}</h4>
          <div className="space-y-2">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${getPriorityColor(
                      task.priority
                    )}`}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {tCommon("plants", { count: task.plantCount })} •{" "}
                      {formatTimestamp(task.dueTime)}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            className="agricultural-touch-target bg-transparent"
          >
            {t("viewAllPlants")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="agricultural-touch-target bg-transparent"
          >
            {t("manageTasks")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
