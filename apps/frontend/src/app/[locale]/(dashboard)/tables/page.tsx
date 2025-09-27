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
  TrendingUp,
} from "lucide-react";

export default function TablesPage() {
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

  const stats = [
    {
      label: "Total Records",
      value: "201,000+",
      icon: Database,
      color: "text-green-600",
    },
    {
      label: "Active Tables",
      value: "4",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      label: "Query Performance",
      value: "<200ms",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium">
          <Database className="h-4 w-4" />
          Data Management Dashboard
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Agricultural Data Tables
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive data management for every aspect of your agricultural
          operations. Choose a table type to view and manage your data.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
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

      {/* Quick Actions */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to Manage Your Data?</h3>
          <p className="text-green-100 max-w-2xl mx-auto">
            Each table is optimized for large datasets with advanced filtering,
            sorting, and export capabilities. Start by selecting the data type
            you want to work with.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/tables/plants">
              <Button size="lg" variant="secondary">
                <Sprout className="mr-2 h-5 w-5" />
                Start with Plants
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
