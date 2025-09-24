"use client";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
      </div>
      <SignIn
        path="/login"
        signUpUrl="/signup"
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
}
