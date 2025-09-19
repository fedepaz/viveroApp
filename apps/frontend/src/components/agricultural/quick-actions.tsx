import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Thermometer,
  Camera,
  ClipboardList,
  AlertTriangle,
  AirVent as Harvest,
} from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      icon: Plus,
      label: "Add Plant",
      description: "Register new plants",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Thermometer,
      label: "Log Temperature",
      description: "Record environmental data",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: Camera,
      label: "Photo Inspection",
      description: "Document plant conditions",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      icon: ClipboardList,
      label: "Daily Tasks",
      description: "View assigned tasks",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      icon: AlertTriangle,
      label: "Report Issue",
      description: "Log plant problems",
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      icon: Harvest,
      label: "Mark Harvest",
      description: "Record harvest completion",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
  ];

  return (
    <Card className="md:hidden">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col space-y-2 agricultural-touch-target bg-transparent"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{action.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
