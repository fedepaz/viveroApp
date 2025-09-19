import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Eye, Filter, MoreHorizontal } from "lucide-react";
import { PlantStatusIndicator } from "./plant-status-indicator";

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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg">Plant Status Overview</CardTitle>
          <p className="text-sm text-muted-foreground">
            {totalPlants.toLocaleString()} total plants
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
              <span>Healthy Plants</span>
            </div>
            <span className="font-medium">
              {statusBreakdown.healthy.toLocaleString()}
            </span>
          </div>
          <Progress value={healthyPercentage} className="h-2" />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <PlantStatusIndicator status="warning" size="sm" />
              <span>Need Attention</span>
            </div>
            <span className="font-medium">
              {statusBreakdown.warning.toLocaleString()}
            </span>
          </div>
          <Progress value={warningPercentage} className="h-2" />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <PlantStatusIndicator status="critical" size="sm" />
              <span>Critical Issues</span>
            </div>
            <span className="font-medium">
              {statusBreakdown.critical.toLocaleString()}
            </span>
          </div>
          <Progress value={criticalPercentage} className="h-2" />
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-medium mb-3">Recent Activity</h4>
          <div className="space-y-3">
            {recentActivity.slice(0, 3).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 text-sm"
              >
                <PlantStatusIndicator status={activity.status} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-muted-foreground truncate">
                    {activity.plant}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.location} • {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <h4 className="text-sm font-medium mb-3">Upcoming Tasks</h4>
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
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-muted-foreground">
                      {task.plantCount} plants • {task.dueTime}
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
            View All Plants
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="agricultural-touch-target bg-transparent"
          >
            Manage Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
