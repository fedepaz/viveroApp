"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Home, Leaf, Thermometer, Calendar, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const bottomNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Plants",
    href: "/plants",
    icon: Leaf,
    badge: "2.3k",
  },
  {
    title: "Environment",
    href: "/environment",
    icon: Thermometer,
    badge: "3",
    badgeVariant: "destructive" as const,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: Calendar,
    badge: "12",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-5 h-16">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex flex-col items-center justify-center h-full space-y-1 relative agricultural-touch-target",
                  isActive ? "text-green-600" : "text-muted-foreground"
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge && (
                    <Badge
                      variant={item.badgeVariant || "secondary"}
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
                    >
                      {item.badge.length > 2 ? "99+" : item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.title}</span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-green-600 rounded-b-full" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
