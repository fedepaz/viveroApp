//src/features/users/components/user-kpi.tsx

import { ReactNode } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface EntityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  showCloseButton?: boolean;
}

export function EntityModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "lg",
  isLoading = false,
}: EntityModalProps) {
  const sizeClasses: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          sizeClasses[size],
          "max-h-[90vh] overflow-hidden p-0 animate-in zoom-in-95 duration-200",
          "border-0 shadow-xl bg-background/95 backdrop-blur-sm"
        )}
      >
        {/* Header with subtle background */}
        <DialogHeader className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold tracking-tight">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-sm text-muted-foreground">
                  {description}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Content with smooth scrolling */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
