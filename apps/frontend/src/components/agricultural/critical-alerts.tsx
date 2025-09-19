"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin, Users, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useTranslations } from "next-intl";

interface Alert {
  id: string;
  type: "temperature" | "humidity" | "pest" | "disease" | "growth";
  severity: "low" | "medium" | "high" | "critical";
  messageKey: string;
  timestamp: Date;
  location: string;
  plantCount: number;
}

interface CriticalAlertsProps {
  alerts: Alert[];
}

export function CriticalAlerts({ alerts }: CriticalAlertsProps) {
  const t = useTranslations("alerts");

  if (alerts.length === 0) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-black";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "temperature":
        return "🌡️";
      case "humidity":
        return "💧";
      case "pest":
        return "🐛";
      case "disease":
        return "🦠";
      default:
        return "⚠️";
    }
  };

  return (
    <Card className="border-red-200 bg-red-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-red-700">
          <AlertTriangle className="h-5 w-5" />
          <span>
            {t("title")} ({alerts.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.slice(0, 3).map((alert) => (
          <div
            key={alert.id}
            className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-red-100"
          >
            <div className="text-lg">{getTypeIcon(alert.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Badge
                  className={getSeverityColor(alert.severity)}
                  variant="secondary"
                >
                  {t(`severity.${alert.severity}`)}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                {t(`messages.${alert.messageKey}`, {
                  location: alert.location,
                })}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {alert.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {alert.plantCount} {t("plantsAffected")}
                </div>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-2 bg-transparent"
              >
                {t("view")}
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        {alerts.length > 3 && (
          <Button variant="outline" className="w-full bg-transparent">
            {t("viewAll", { count: alerts.length })}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
