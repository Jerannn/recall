import Header from "@/components/layout/Header";
import LibraryDetailActions from "@/features/library/components/LibraryDetailActions";
import LibraryDetails from "@/features/library/components/LibraryDetails";
import { Suspense } from "react";

interface LibraryDetailPageProps {
  params: Promise<{ libraryId: string }>;
}

async function LibraryDetailContent({
  params,
}: {
  params: Promise<{ libraryId: string }>;
}) {
  const { libraryId } = await params;

  return (
    <div className="flex flex-col">
      <Header
        title="Reader View"
        breadcrumbs={[
          { label: "Library", href: "/library" },
          { label: "Reader" },
        ]}
        actions={<LibraryDetailActions libraryId={libraryId} />}
      />

      <LibraryDetails libraryId={libraryId} />
    </div>
  );
}

export default function LibraryDetailPage({
  params,
}: LibraryDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl py-12 px-6 text-xs text-muted-foreground animate-pulse">
          Loading reader content...
        </div>
      }
    >
      <LibraryDetailContent params={params} />
    </Suspense>
  );
}
