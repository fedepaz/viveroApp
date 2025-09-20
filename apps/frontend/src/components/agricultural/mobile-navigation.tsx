"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Leaf,
  Thermometer,
  Calendar,
  Users,
  Package,
  BarChart3,
  Settings,
  Menu,
  AlertTriangle,
  Badge,
} from "lucide-react";
import { useTranslations } from "next-intl"; // Import useTranslations
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

const navigationItems = [
  // These will be translated using 't' from useTranslations
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation"); // Use 'navigation' namespace for menu items
  const tCommon = useTranslations("common"); // Use 'common' namespace for general terms
  const tAlerts = useTranslations("alerts"); // Use 'alerts' namespace for alert messages

  const navigationItems = [
    {
      title: t("dashboard"),
      href: "/",
      icon: Home,
      description: t("overviewAndAlerts"),
    },
    {
      title: t("plants"),
      href: "/plants",
      icon: Leaf,
      description: t("plantManagement"),
      badge: "2.3k",
    },
    {
      title: t("environment"),
      href: "/environment",
      icon: Thermometer,
      description: t("climateMonitoring"),
      badge: "3",
      badgeVariant: "destructive" as const,
    },
    {
      title: t("tasks"),
      href: "/tasks",
      icon: Calendar,
      description: t("dailyOperations"),
      badge: "12",
    },
    {
      title: t("clients"),
      href: "/clients",
      icon: Users,
      description: t("clientManagement"),
    },
    {
      title: t("inventory"),
      href: "/inventory",
      icon: Package,
      description: t("supplyTracking"),
    },
    {
      title: t("analytics"),
      href: "/analytics",
      icon: BarChart3,
      description: t("performanceMetrics"),
    },
    {
      title: t("settings"),
      href: "/settings",
      icon: Settings,
      description: t("systemConfiguration"),
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden agricultural-touch-target"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader>
          <SheetTitle className="sr-only">
            {tCommon("mobileNavigation")}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">AG</span>
              </div>
              <div>
                <h2 className="font-bold text-lg">{tCommon("agriManage")}</h2>
                <p className="text-sm text-muted-foreground">
                  {tCommon("plantManagement")}
                </p>
              </div>
            </div>
          </div>

          {/* Critical Alerts Banner */}
          <div className="p-4 bg-red-50 border-b border-red-200">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {tAlerts("criticalAlerts", { count: 3 })}
              </span>
            </div>
            <p className="text-xs text-red-600 mt-1">
              {tAlerts("temperatureIssues", { location: "Greenhouse B" })}
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg transition-colors agricultural-touch-target",
                      isActive
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs opacity-75">{item.description}</p>
                    </div>
                    {item.badge && (
                      <Badge className="text-xs">{item.badge}</Badge>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium">{tCommon("johnDoe")}</p>
                <p className="text-xs text-muted-foreground">
                  {tCommon("greenhouseManager")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
