"use client";

import {
  Plus,
  Thermometer,
  Camera,
  ClipboardList,
  AlertTriangle,
  Tractor,
} from "lucide-react";
import { useTranslations } from "next-intl"; // Import useTranslations
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function QuickActions() {
  const t = useTranslations("quickActions"); // Initialize useTranslations

  const actions = [
    {
      icon: Plus,
      label: t("addPlantLabel"),
      description: t("addPlantDescription"),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Thermometer,
      label: t("logTemperatureLabel"),
      description: t("logTemperatureDescription"),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: Camera,
      label: t("photoInspectionLabel"),
      description: t("photoInspectionDescription"),
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      icon: ClipboardList,
      label: t("dailyTasksLabel"),
      description: t("dailyTasksDescription"),
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      icon: AlertTriangle,
      label: t("reportIssueLabel"),
      description: t("reportIssueDescription"),
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      icon: Tractor,
      label: t("markHarvestLabel"),
      description: t("markHarvestDescription"),
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
  ];

  return (
    <Card className="md:hidden">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
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
