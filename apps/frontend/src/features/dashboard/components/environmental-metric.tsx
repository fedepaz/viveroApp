import { cn } from "@/lib/utils";
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";
import { useTranslations } from "next-intl"; // Import useTranslations

interface EnvironmentalMetricProps {
  label: string;
  value: number;
  unit: string;
  status: "optimal" | "warning" | "critical";
  trend?: "rising" | "falling" | "stable";
  target?: { min: number; max: number };
}

export function EnvironmentalMetric({
  label,
  value,
  unit,
  status,
  trend,
  target,
}: EnvironmentalMetricProps) {
  const t = useTranslations("environmental"); // Use 'environmentalMetric' namespace

  const getTrendIcon = () => {
    switch (trend) {
      case "rising":
        return <TrendingUpIcon className="w-5 h-5 text-green-500" />;
      case "falling":
        return <TrendingDownIcon className="w-5 h-5 text-red-500" />;
      case "stable":
        return <MinusIcon className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "optimal":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className={cn("environmental-metric", `metric-${status}`)}>
      <div className={cn("metric-value", getStatusColor())}>
        {value.toFixed(1)}
        <span className="text-lg ml-1">{unit}</span>
        {trend && <span className="ml-2">{getTrendIcon()}</span>}
      </div>
      <div className="metric-label">{label}</div>
      {target && (
        <div className="text-xs text-muted-foreground mt-1">
          {t("target", { min: target.min, max: target.max, unit: unit })}
        </div>
      )}
    </div>
  );
}
