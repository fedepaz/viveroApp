//src/features/users/components/user-kpi.tsx

import { ReactNode } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";

interface EntityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function EntityModal({
  open,
  onOpenChange,
  title,
  description,
  children,
}: EntityModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
