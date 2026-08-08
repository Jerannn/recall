import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import LibraryDetails from "@/features/library/components/LibraryDetails";
import Link from "next/link";
import { Suspense } from "react";

interface LibraryDetailPageProps {
  params: Promise<{ libraryId: string }>;
}

export default async function LibraryDetailPage({
  params,
}: LibraryDetailPageProps) {
  const { libraryId } = await params;
  return (
    <div>
      <Header
        title="Create new library"
        actions={
          <div className="space-x-3">
            <Button variant="outline">
              <Link href="#">Edit</Link>
            </Button>
            <Button variant="destructive">
              <Link href="#">Delete</Link>
            </Button>
          </div>
        }
      />

      <Link href="/library">Back to library</Link>
      <Suspense fallback={<p>Loading...</p>}>
        <LibraryDetails id={libraryId} />
      </Suspense>
    </div>
  );
}
