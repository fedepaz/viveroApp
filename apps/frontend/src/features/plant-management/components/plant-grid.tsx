"use client";

import { useState } from "react";
import { PlantCard } from "@/features/plant-management";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Grid3X3, List, SortAsc, Plus } from "lucide-react";
import type { Plant } from "@/features/plant-management";
import { useTranslations } from "next-intl";

// Mock plant data (will remain hardcoded for now, as it's mock data)
const mockPlants: Plant[] = [
  {
    id: "plant-001",
    name: "Premium Red Tulips",
    type: "tulip",
    variety: "Darwin Hybrid",
    status: "flowering",
    plantedDate: new Date("2024-01-15"),
    expectedHarvestDate: new Date("2024-04-15"),
    currentTemperature: 22.5,
    humidity: 68,
    location: {
      greenhouse: "Greenhouse A",
      section: "Section 1",
      row: 5,
      position: 12,
    },
    healthScore: 92,
    alerts: [],
  },
  {
    id: "plant-002",
    name: "Golden Daffodils",
    type: "daffodil",
    variety: "King Alfred",
    status: "growing",
    plantedDate: new Date("2024-02-01"),
    expectedHarvestDate: new Date("2024-05-01"),
    currentTemperature: 28.2,
    humidity: 45,
    location: {
      greenhouse: "Greenhouse B",
      section: "Section 2",
      row: 3,
      position: 8,
    },
    healthScore: 65,
    alerts: [
      {
        type: "temperature",
        severity: "critical",
        message: "Temperature exceeds optimal range",
        timestamp: new Date(),
      },
      {
        type: "humidity",
        severity: "medium",
        message: "Low humidity detected",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "plant-003",
    name: "Purple Hyacinths",
    type: "hyacinth",
    variety: "Woodstock",
    status: "harvesting",
    plantedDate: new Date("2023-12-10"),
    expectedHarvestDate: new Date("2024-03-10"),
    currentTemperature: 21.8,
    humidity: 72,
    location: {
      greenhouse: "Greenhouse C",
      section: "Section 1",
      row: 2,
      position: 15,
    },
    healthScore: 88,
    alerts: [],
  },
  {
    id: "plant-004",
    name: "White Crocuses",
    type: "crocus",
    variety: "Jeanne d'Arc",
    status: "germinating",
    plantedDate: new Date("2024-02-20"),
    expectedHarvestDate: new Date("2024-04-20"),
    currentTemperature: 19.5,
    humidity: 78,
    location: {
      greenhouse: "Greenhouse A",
      section: "Section 3",
      row: 1,
      position: 5,
    },
    healthScore: 95,
    alerts: [],
  },
];

interface PlantGridProps {
  plants?: Plant[];
}

export function PlantGrid({ plants = mockPlants }: PlantGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("name");

  const t = useTranslations("plantGrid"); // Initialize useTranslations

  // Filter and sort plants
  const filteredPlants = plants
    .filter((plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.variety.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || plant.status === filterStatus;
      const matchesType = filterType === "all" || plant.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "health":
          return b.healthScore - a.healthScore;
        case "planted":
          return (
            new Date(b.plantedDate).getTime() -
            new Date(a.plantedDate).getTime()
          );
        case "harvest":
          return (
            new Date(a.expectedHarvestDate).getTime() -
            new Date(b.expectedHarvestDate).getTime()
          );
        default:
          return 0;
      }
    });

  const handlePlantUpdate = (plantId: string) => {
    console.log("Update plant:", plantId);
    // In a real app, this would open an update modal or navigate to edit page
  };

  const handleViewDetails = (plantId: string) => {
    console.log("View plant details:", plantId);
    // In a real app, this would navigate to plant details page
  };

  const getStatusCount = (status: string) => {
    if (status === "all") return plants.length;
    return plants.filter((plant) => plant.status === status).length;
  };

  const getCriticalCount = () => {
    return plants.filter((plant) =>
      plant.alerts.some((alert) => alert.severity === "critical")
    ).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">{t("plantManagement")}</h2>
          <div>
            {t("ofPlants", {
              filtered: filteredPlants.length,
              total: plants.length,
            })}
            {getCriticalCount() > 0 && (
              <Badge className="ml-2">
                {t("criticalAlertsCount", { count: getCriticalCount() })}
              </Badge>
            )}
          </div>
        </div>
        <Button className="agricultural-touch-target">
          <Plus className="h-4 w-4 mr-2" />
          {t("addPlant")}
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchPlants")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 agricultural-touch-target"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 agricultural-touch-target">
              <SelectValue placeholder={t("status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("allStatus", { count: getStatusCount("all") })}
              </SelectItem>
              <SelectItem value="planted">
                {t("plantedStatus", { count: getStatusCount("planted") })}
              </SelectItem>
              <SelectItem value="germinating">
                {t("germinatingStatus", {
                  count: getStatusCount("germinating"),
                })}
              </SelectItem>
              <SelectItem value="growing">
                {t("growingStatus", { count: getStatusCount("growing") })}
              </SelectItem>
              <SelectItem value="flowering">
                {t("floweringStatus", { count: getStatusCount("flowering") })}
              </SelectItem>
              <SelectItem value="harvesting">
                {t("harvestingStatus", { count: getStatusCount("harvesting") })}
              </SelectItem>
              <SelectItem value="harvested">
                {t("harvestedStatus", { count: getStatusCount("harvested") })}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32 agricultural-touch-target">
              <SelectValue placeholder={t("type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allTypes")}</SelectItem>
              <SelectItem value="tulip">{t("tulips")}</SelectItem>
              <SelectItem value="daffodil">{t("daffodils")}</SelectItem>
              <SelectItem value="hyacinth">{t("hyacinths")}</SelectItem>
              <SelectItem value="crocus">{t("crocuses")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 agricultural-touch-target">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">{t("name")}</SelectItem>
              <SelectItem value="health">{t("healthScore")}</SelectItem>
              <SelectItem value="planted">{t("plantedDate")}</SelectItem>
              <SelectItem value="harvest">{t("harvestDate")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Plant Grid/List */}
      {filteredPlants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("noPlantsFound")}</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onUpdate={handlePlantUpdate}
              onViewDetails={handleViewDetails}
              viewMode={viewMode === "list" ? "compact" : "detailed"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
