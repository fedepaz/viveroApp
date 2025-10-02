import { LoadingSpinner } from "@/components/common/loading-spinner";

/**
 * A placeholder loading component for this route.
 *
 * It's displayed instantly on navigation while the `page.tsx` component
 * and its data dependencies are being prepared on the server.
 *
 * TODO: Replace this with a custom skeleton component that mimics the page's layout.
 */
export default function Loading() {
  return <LoadingSpinner />;
}
