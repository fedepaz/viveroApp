import { PlantsDashboard } from "@/features/plants";
import { setRequestLocale } from "next-intl/server";

interface PlantsPageProps {
  params: { locale: string };
}

export default function PlantsPage({ params }: PlantsPageProps) {
  setRequestLocale(params.locale);
  return <PlantsDashboard />;
}