import Header from "@/components/layout/Header";
import LibraryDetailActions from "@/features/library/components/LibraryDetailActions";
import LibraryDetails from "@/features/library/components/LibraryDetails";
import Link from "next/link";
import { Suspense } from "react";

interface LibraryDetailPageProps {
  params: Promise<{ libraryId: string }>;
}

export default async function LibraryDetailPage({
  params,
}: LibraryDetailPageProps) {
  return (
    <div>
      <Header
        title="Details"
        actions={
          <Suspense fallback={<p>Loading...</p>}>
            <LibraryDetailActions params={params} />
          </Suspense>
        }
      />

      <Link href="/library">Back to library</Link>

      {/* TODO: apply a real loading UI Spinner or Skeleton */}
      <Suspense fallback={<p>Loading...</p>}>
        <LibraryDetails params={params} />
      </Suspense>
    </div>
  );
}
