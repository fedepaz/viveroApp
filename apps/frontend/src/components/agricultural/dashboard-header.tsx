"use client";

import { Bell, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "./mobile-navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "../common/theme-toggle";
import { useLocale, useTranslations } from "next-intl";

export function DashboardHeader() {
  const locale = useLocale();
  console.log("Current locale:", locale);

  const t = useTranslations("dashboard");
  console.log("Translation function:", typeof t);
  console.log("Translation function:", t);
  console.log("Translation function:", t("title"));
  console.log("Translation function:", t("search"));
  console.log("Translation function:", t("notifications"));
  console.log("Translation function:", t("settings"));
  console.log("Translation function:", t("profile"));
  console.log("Translation function:", t("team"));
  console.log("Translation function:", t("preferences"));
  console.log("Translation function:", t("signOut"));
  console.log("Translation function:", t("userRole"));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Mobile Navigation */}
          <div className="flex items-center space-x-4">
            <MobileNavigation />
            <div className="flex items-center space-x-2 md:hidden">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AG</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  {t("title")}
                </h1>
              </div>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("search")}
                className="pl-10 agricultural-touch-target"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative agricultural-touch-target"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="agricultural-touch-target"
            >
              <Settings className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="agricultural-touch-target"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t("userRole")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
                <DropdownMenuItem>{t("team")}</DropdownMenuItem>
                <DropdownMenuItem>{t("preferences")}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t("signOut")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
