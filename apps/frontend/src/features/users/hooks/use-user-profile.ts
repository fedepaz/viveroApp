// apps/frontend/src/features/users/hooks/use-user-profile.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { backendFetch } from "@/lib/api/backend";
import { useUser } from "@clerk/nextjs";
import { UserProfileDto } from "@vivero/shared";

// This is the key for the query cache
export const userProfileQueryKeys = {
  all: ["userProfile"] as const,
  me: () => [...userProfileQueryKeys.all, "me"] as const,
};

export const useUserProfile = () => {
  const { isLoaded, isSignedIn } = useUser();

  const { data: userProfile, ...rest } = useQuery<UserProfileDto>({
    queryKey: userProfileQueryKeys.me(),
    // The query function will call our server action
    queryFn: () => backendFetch<UserProfileDto>("users/me", { method: "GET" }),
    // Only enable the query if the user is loaded and signed in
    enabled: isLoaded && isSignedIn,
  });
  if (userProfile) {
    console.log("userProfile", userProfile);
  }

  return { userProfile, ...rest };
};
