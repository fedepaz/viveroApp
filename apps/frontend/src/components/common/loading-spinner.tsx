//src/components/common/loading-spinner.tsx
"use client";

import { cn } from "@/lib/utils";

export function LoadingSpinner() {
  const funnyMessages = [
    "Compilando con Internet Explorer 6...",
    "Esperando que Flash Player se actualice...",
    "Desfragmentando el disco duro del servidor...",
    "Reiniciando Windows ME por tercera vez...",
    "Descargando 56k de pura nostalgia...",
    "Buscando drivers en DriverGuide.com...",
    "Esperando que termine de cargar RealPlayer...",
    "Liberando memoria con el Task Manager...",
    "Rogando que no sea un Blue Screen...",
    "Conectando por dial-up a las 3 AM...",
    "Instalando 47 toolbars de Ask Jeeves...",
    "Esperando que WinRAR deje de pedir licencia...",
  ];

  const randomMessage =
    funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/30 text-foreground">
      <div className={cn("flex items-center justify-center", "mb-6")}>
        <div className="animate-spin rounded-full h-20 w-20 border-t-6 border-b-6 border-primary"></div>
      </div>
      <p className="text-xl font-semibold text-muted-foreground max-w-md text-center px-4">
        {randomMessage}
      </p>
    </div>
  );
}
