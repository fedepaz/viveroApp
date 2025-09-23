"use client";

import { Plant } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Badge,
  MapPin,
  Thermometer,
  Droplets,
  AlertTriangle,
  Calendar,
  Edit,
  Eye,
  Camera,
} from "lucide-react";
import { useTranslations } from "next-intl"; // Import useTranslations

import { PlantStatusIndicator } from "../../../components/agricultural/plant-status-indicator";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PlantCardProps {
  plant: Plant;
  onUpdate: (plantId: string) => void;
  onViewDetails: (plantId: string) => void;
  viewMode?: "compact" | "detailed" | "mobile";
}

export function PlantCard({
  plant,
  onUpdate,
  onViewDetails,
  viewMode = "detailed",
}: PlantCardProps) {
  const t = useTranslations("plantGrid");

  const getStatusClass = () => {
    if (plant.alerts.some((alert) => alert.severity === "critical"))
      return "critical";
    if (
      plant.alerts.some(
        (alert) => alert.severity === "high" || alert.severity === "medium"
      )
    )
      return "warning";
    if (plant.healthScore >= 80) return "healthy";
    return "warning";
  };

  const getPlantTypeEmoji = (type: string) => {
    switch (type) {
      case "tulip":
        return "🌷";
      case "daffodil":
      case "hyacinth":
      case "crocus":
        return "🌸";
      default:
        return "🌱";
    }
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp < 15 || temp > 25) return "critical";
    if (temp < 18 || temp > 24) return "warning";
    return "optimal";
  };

  const getHumidityStatus = (humidity: number) => {
    if (humidity < 50 || humidity > 80) return "critical";
    if (humidity < 60 || humidity > 75) return "warning";
    return "optimal";
  };

  const statusClass = getStatusClass();
  const tempStatus = getTemperatureStatus(plant.currentTemperature);
  const humidityStatus = getHumidityStatus(plant.humidity);

  if (viewMode === "compact") {
    return (
      <Card
        className={cn("plant-health-card", statusClass)}
        onClick={() => onViewDetails(plant.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{getPlantTypeEmoji(plant.type)}</div>
              <div>
                <h3 className="font-semibold text-sm">{plant.name}</h3>
                <p className="text-xs text-muted-foreground">{plant.variety}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <PlantStatusIndicator status={statusClass as any} size="sm" />
              {plant.alerts.length > 0 && (
                <Badge className="text-xs">{plant.alerts.length}</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("plant-health-card", statusClass)}>
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{getPlantTypeEmoji(plant.type)}</div>
            <div>
              <h3 className="font-semibold text-lg">{plant.name}</h3>
              <p className="text-sm text-muted-foreground">{plant.variety}</p>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {plant.location.greenhouse} - {plant.location.section} -{" "}
                  {t("row", { row: plant.location.row })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <PlantStatusIndicator status={statusClass as any} />
            {plant.alerts.length > 0 && (
              <Badge className="text-xs">{plant.alerts.length}</Badge>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-4">
          <Badge className="text-xs capitalize">{t(plant.status)}</Badge>
        </div>

        {/* Environmental Data */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Thermometer
              className={cn("h-4 w-4", {
                "text-green-500": tempStatus === "optimal",
                "text-yellow-500": tempStatus === "warning",
                "text-red-500": tempStatus === "critical",
              })}
            />
            <div>
              <p className="text-sm font-medium">
                {plant.currentTemperature}°C
              </p>
              <p className="text-xs text-muted-foreground">
                {t("temperature")}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets
              className={cn("h-4 w-4", {
                "text-green-500": humidityStatus === "optimal",
                "text-yellow-500": humidityStatus === "warning",
                "text-red-500": humidityStatus === "critical",
              })}
            />
            <div>
              <p className="text-sm font-medium">{plant.humidity}%</p>
              <p className="text-xs text-muted-foreground">{t("humidity")}</p>
            </div>
          </div>
        </div>

        {/* Health Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>{t("healthScore")}</span>
            <span className="font-medium">{plant.healthScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={cn("h-2 rounded-full", {
                "bg-green-500": plant.healthScore >= 80,
                "bg-yellow-500":
                  plant.healthScore >= 60 && plant.healthScore < 80,
                "bg-red-500": plant.healthScore < 60,
              })}
              style={{ width: `${plant.healthScore}%` }}
            />
          </div>
        </div>

        {/* Alerts */}
        {plant.alerts.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-red-700">
                {t("alerts", { count: plant.alerts.length })}
              </span>
            </div>
            {plant.alerts.slice(0, 2).map((alert, index) => (
              <div key={index} className="text-xs text-red-600 mb-1">
                <Badge className="mr-2 text-xs">
                  {alert.severity.toUpperCase()}
                </Badge>
                {alert.message}
              </div>
            ))}
            {plant.alerts.length > 2 && (
              <p className="text-xs text-red-600">
                {t("moreAlerts", { count: plant.alerts.length - 2 })}
              </p>
            )}
          </div>
        )}

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <div>
              <p>{t("planted")}</p>
              <p className="font-medium">
                {formatDate(plant.plantedDate, "MMM dd")}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <div>
              <p>{t("harvestExpected")}</p>
              <p className="font-medium">
                {formatDate(plant.expectedHarvestDate, "MMM dd")}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 agricultural-touch-target bg-transparent"
            onClick={() => onUpdate(plant.id)}
          >
            <Edit className="h-3 w-3 mr-1" />
            {t("update")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 agricultural-touch-target bg-transparent"
            onClick={() => onViewDetails(plant.id)}
          >
            <Eye className="h-3 w-3 mr-1" />
            {t("details")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="agricultural-touch-target bg-transparent"
          >
            <Camera className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
