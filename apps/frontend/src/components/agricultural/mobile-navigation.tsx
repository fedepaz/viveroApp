"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Leaf,
  Thermometer,
  Users,
  BarChart3,
  Settings,
  Menu,
  AlertTriangle,
  Calendar,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    description: "Overview and alerts",
  },
  {
    title: "Plants",
    href: "/plants",
    icon: Leaf,
    description: "Plant management",
    badge: "2.3k",
  },
  {
    title: "Environment",
    href: "/environment",
    icon: Thermometer,
    description: "Climate monitoring",
    badge: "3",
    badgeVariant: "destructive" as const,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: Calendar,
    description: "Daily operations",
    badge: "12",
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Users,
    description: "Client management",
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
    description: "Supply tracking",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Performance metrics",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "System configuration",
  },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">AG</span>
              </div>
              <div>
                <h2 className="font-bold text-lg">AgriManage</h2>
                <p className="text-sm text-muted-foreground">
                  Plant Management
                </p>
              </div>
            </div>
          </div>

          {/* Critical Alerts Banner */}
          <div className="p-4 bg-red-50 border-b border-red-200">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">3 Critical Alerts</span>
            </div>
            <p className="text-xs text-red-600 mt-1">
              Temperature issues in Greenhouse B
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
                      <Badge
                        variant={item.badgeVariant || "secondary"}
                        className="text-xs"
                      >
                        {item.badge}
                      </Badge>
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
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  Greenhouse Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
