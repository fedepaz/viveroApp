//src/features/data-table/types.ts

import { LucideIcon } from "lucide-react";

interface DataTableInterface {
  icon: LucideIcon;
  title: string;
  description: string;
  count: string;
  href: string;
  color: string;
  bgColor: string;
  features: Array<string>;
}

export type { DataTableInterface };
