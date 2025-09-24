import { cn } from "@/lib/utils";
import { CheckIcon, AlertTriangleIcon, XIcon, StarIcon } from "lucide-react";
import { useTranslations } from "next-intl"; // Import useTranslations

interface PlantStatusIndicatorProps {
  status: "healthy" | "warning" | "critical" | "harvest-ready";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function PlantStatusIndicator({
  status,
  size = "md",
  showIcon = true,
}: PlantStatusIndicatorProps) {
  const t = useTranslations("plants"); // Initialize useTranslations

  const sizeClasses = {
    sm: "w-4 h-4 text-xs",
    md: "w-6 h-6 text-sm",
    lg: "w-8 h-8 text-base",
  };

  const statusConfig = {
    healthy: {
      className: "status-healthy",
      icon: CheckIcon,
      label: t("healthy"),
    },
    warning: {
      className: "status-warning",
      icon: AlertTriangleIcon,
      label: t("needsAttention"),
    },
    critical: {
      className: "status-critical",
      icon: XIcon,
      label: t("critical"),
    },
    "harvest-ready": {
      className: "bg-yellow-500",
      icon: StarIcon,
      label: t("nextHarvest"),
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn("plant-status", config.className, sizeClasses[size])}
      title={config.label}
    >
      {showIcon && <Icon className="w-3 h-3" />}
    </div>
  );
}
