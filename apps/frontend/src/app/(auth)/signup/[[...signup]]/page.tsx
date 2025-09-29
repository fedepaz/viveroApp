//src/app/(auth)/signup/[[...signup]]/page.tsx

"use client";

import { SignUp } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { shadcn } from "@clerk/themes";
import { useIsMounted } from "@/hooks/useIsMounted";
import { LoadingSpinner } from "@/components/common/loading-spinner";

export default function SignupPage() {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
      </div>
      <SignUp
        path="/signup"
        signInUrl="/login"
        appearance={{
          baseTheme: shadcn,
        }}
      />
    </div>
  );
}
