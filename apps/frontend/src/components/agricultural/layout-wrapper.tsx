import type React from "react";
import { DesktopSidebar } from "./desktop-sidebar";
import { BottomNavigation } from "./bottom-navigation";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex h-screen bg-background">
      <DesktopSidebar />
      <main className="flex-1 overflow-auto pb-16 md:pb-0">{children}</main>
      <BottomNavigation />
    </div>
  );
}
