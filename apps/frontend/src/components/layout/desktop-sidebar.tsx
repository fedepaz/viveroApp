"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Thermometer,
  Users,
  BarChart3,
  Calendar,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  FileText,
  ShoppingCart,
  Sprout,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslations } from "next-intl"; // Import useTranslations
import { Link, usePathname } from "@/i18n/navigation";

export function DesktopSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
      title: t("analytics"),
      href: "/analytics",
      icon: BarChart3,
      description: t("analytics"),
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
  ];

  const secondaryItems = [
    {
      title: t("plants"),
      href: "/plants",
      icon: Sprout,
    },
    {
      title: t("clients"),
      href: "/clients",
      icon: Users,
    },
    {
      title: t("invoices"),
      href: "/invoices",
      icon: FileText,
    },
    {
      title: t("purchaseOrders"),
      href: "/purchase-orders",
      icon: ShoppingCart,
    },
    {
      title: t("users"),
      href: "/users",
      icon: UserCircle,
    },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-card border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AG</span>
              </div>
              <div>
                <h2 className="font-bold">{tCommon("agriManage")}</h2>
                <p className="text-xs text-muted-foreground">
                  {tCommon("plantManagement")}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {!isCollapsed && (
        <div className="p-3 bg-red-50 border-b border-red-200">
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
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {/* Primary Navigation */}
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center space-x-3 p-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                    isCollapsed && "justify-center"
                  )}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {item.badge && isCollapsed && (
                      <Badge
                        variant={item.badgeVariant || "secondary"}
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                      >
                        {item.badge.length > 2 ? "99+" : item.badge}
                      </Badge>
                    )}
                  </div>
                  {!isCollapsed && (
                    <>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs opacity-75">{item.description}</p>
                      </div>
                      {item.badge && (
                        <Badge
                          variant={item.badgeVariant || "secondary"}
                          className="text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {!isCollapsed && <Separator className="my-4" />}

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center space-x-3 p-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                    isCollapsed && "justify-center"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-3 border-t">
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
      )}
    </aside>
  );
}
