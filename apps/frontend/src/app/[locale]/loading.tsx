import { RootDashboardSkeleton } from "@/features/dashboard";

/**
 * This is the loading skeleton for the root dashboard page.
 *
 * It's displayed instantly on navigation while the `page.tsx` component
 * and its data dependencies are being prepared on the server.
 *
 * @returns {JSX.Element} The skeleton component for the dashboard.
 */
export default function Loading() {
  return <RootDashboardSkeleton />;
}
