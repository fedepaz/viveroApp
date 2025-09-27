"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  Users,
  FileText,
  ShoppingCart,
  ArrowRight,
  Database,
} from "lucide-react";

export function TablesGrid() {
  const tableTypes = [
    {
      icon: Sprout,
      title: "Plant Management",
      description:
        "Monitor and manage all plants across your agricultural facilities",
      count: "200,000+",
      href: "/tables/plants",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      features: [
        "Health monitoring",
        "Environmental data",
        "Growth tracking",
        "Harvest planning",
      ],
    },
    {
      icon: Users,
      title: "User Management",
      description:
        "Manage user accounts and permissions across your organization",
      count: "150+",
      href: "/tables/users",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      features: [
        "Role management",
        "Access control",
        "Activity tracking",
        "Department organization",
      ],
    },
    {
      icon: FileText,
      title: "Invoice Management",
      description: "Track and manage all invoices and payments",
      count: "500+",
      href: "/tables/invoices",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      features: [
        "Payment tracking",
        "Client management",
        "Due date alerts",
        "Financial reporting",
      ],
    },
    {
      icon: ShoppingCart,
      title: "Purchase Orders",
      description: "Manage purchase orders and supplier relationships",
      count: "300+",
      href: "/tables/purchase-orders",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      features: [
        "Supplier management",
        "Order tracking",
        "Delivery status",
        "Procurement analytics",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">
            <Database />
            Data Management Dashboard
          </h2>
        </div>
      </div>

      {/* Table Types Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {tableTypes.map((table, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group"
          >
            <CardHeader className={`${table.bgColor} rounded-t-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <table.icon className={`h-8 w-8 ${table.color}`} />
                  <div>
                    <CardTitle className="text-xl">{table.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {table.count} records
                    </Badge>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <CardDescription className="text-base">
                {table.description}
              </CardDescription>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Key Features:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {table.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${table.color.replace("text-", "bg-")}`}
                      />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <Link href={table.href}>
                <Button
                  className="w-full mt-4 bg-transparent"
                  variant="outline"
                >
                  View {table.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
