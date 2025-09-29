"use client";

import { Settings, TrendingUp, AlertTriangle, Badge } from "lucide-react";

import { useTranslations } from "next-intl";
import { EnvironmentalMetric } from "@/features/dashboard/components/environmental-metric";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDashboardEnvironmentalData } from "../hooks/hooks";

export function EnvironmentalOverview() {
  const { data } = useDashboardEnvironmentalData();
  const t = useTranslations("environmental"); // Use 'environmentalOverview' namespace
  const tCommon = useTranslations("common"); // Use 'common' namespace for general terms

  const section = data.greenhouse.sections[0]; // Using first section for demo
  const { temperature, humidity, light } = section.sensors;

  // Determine status based on thresholds
  const getTemperatureStatus = (temp: number) => {
    if (temp >= data.alertThresholds.temperature.critical) return "critical";
    if (temp >= data.alertThresholds.temperature.warning) return "warning";
    if (temp >= temperature.optimal.min && temp <= temperature.optimal.max)
      return "optimal";
    return "warning";
  };

  const getHumidityStatus = (hum: number) => {
    if (hum >= data.alertThresholds.humidity.critical) return "critical";
    if (hum >= data.alertThresholds.humidity.warning) return "warning";
    if (hum >= humidity.optimal.min && hum <= humidity.optimal.max)
      return "optimal";
    return "warning";
  };

  const tempStatus = getTemperatureStatus(temperature.current);
  const humidityStatus = getHumidityStatus(humidity.current);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg">{t("title")}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {tCommon("greenhouseName", { name: data.greenhouse.name })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="text-xs">
            {tCommon("sectionName", { name: section.name })}
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Environmental Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <EnvironmentalMetric
            label={t("temperature")}
            value={temperature.current}
            unit="°C"
            status={tempStatus}
            trend={temperature.trend}
            target={temperature.optimal}
          />
          <EnvironmentalMetric
            label={t("humidity")}
            value={humidity.current}
            unit="%"
            status={humidityStatus}
            trend={humidity.trend}
            target={humidity.optimal}
          />
          <EnvironmentalMetric
            label={t("lightLevel")}
            value={light.current / 1000}
            unit="klux"
            status="optimal"
            target={{ min: 12, max: 18 }}
          />
        </div>

        {/* Environmental Alerts */}
        {(tempStatus === "critical" || humidityStatus === "critical") && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {t("environmentalAlert")}
              </span>
            </div>
            <p className="text-sm text-red-600 mt-1">
              {tempStatus === "critical" && t("temperatureExceedsCritical")}{" "}
              {humidityStatus === "critical" && t("humidityCriticallyHigh")}{" "}
              {t("immediateActionRequired")}
            </p>
          </div>
        )}

        {/* Quick Environmental Controls */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            className="agricultural-touch-target bg-transparent"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            {t("adjustClimate")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="agricultural-touch-target bg-transparent"
          >
            <Settings className="h-4 w-4 mr-2" />
            {t("viewHistory")}
          </Button>
        </div>

        {/* Environmental Summary */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>{t("dailyLightTotal")}:</span>
            <span>{(light.dailyTotal / 1000).toFixed(0)} klux·h</span>
          </div>
          <div className="flex justify-between">
            <span>{t("lightSpectrum")}:</span>
            <span className="capitalize">{light.spectrum}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("lastUpdated")}:</span>
            <span>2 minutes ago</span> {/* This should also be translated */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
