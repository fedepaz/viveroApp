import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnvironmentalMetric } from "./environmental-metric";
import { Badge } from "@/components/ui/badge";
import { Settings, TrendingUp, AlertTriangle } from "lucide-react";
import type { EnvironmentalData } from "@/lib/types";

interface EnvironmentalOverviewProps {
  data: EnvironmentalData;
}

export function EnvironmentalOverview({ data }: EnvironmentalOverviewProps) {
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
          <CardTitle className="text-lg">Environmental Monitoring</CardTitle>
          <p className="text-sm text-muted-foreground">
            {data.greenhouse.name}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            {section.name}
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
            label="Temperature"
            value={temperature.current}
            unit="°C"
            status={tempStatus}
            trend={temperature.trend}
            target={temperature.optimal}
          />
          <EnvironmentalMetric
            label="Humidity"
            value={humidity.current}
            unit="%"
            status={humidityStatus}
            trend={humidity.trend}
            target={humidity.optimal}
          />
          <EnvironmentalMetric
            label="Light Level"
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
              <span className="text-sm font-medium">Environmental Alert</span>
            </div>
            <p className="text-sm text-red-600 mt-1">
              {tempStatus === "critical" &&
                "Temperature exceeds critical threshold. "}
              {humidityStatus === "critical" &&
                "Humidity levels are critically high. "}
              Immediate action required.
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
            Adjust Climate
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="agricultural-touch-target bg-transparent"
          >
            <Settings className="h-4 w-4 mr-2" />
            View History
          </Button>
        </div>

        {/* Environmental Summary */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Daily Light Total:</span>
            <span>{(light.dailyTotal / 1000).toFixed(0)} klux·h</span>
          </div>
          <div className="flex justify-between">
            <span>Light Spectrum:</span>
            <span className="capitalize">{light.spectrum}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated:</span>
            <span>2 minutes ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
