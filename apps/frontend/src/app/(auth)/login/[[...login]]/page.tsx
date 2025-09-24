"use client";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { useIsMounted } from "@/hooks/useIsMounted";
import { SignIn } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

export default function LoginPage() {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
      </div>
      <SignIn
        path="/login"
        signUpUrl="/signup"
        appearance={{
          baseTheme: shadcn,
        }}
      />
    </div>
  );
}
