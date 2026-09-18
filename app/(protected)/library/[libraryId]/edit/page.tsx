import Header from "@/components/layout/Header";
import LoadingText from "@/components/LoadingText";
import { Button } from "@/components/ui/button";
import LibraryEditForm from "@/features/library/components/LibraryEditForm";
import Link from "next/link";
import { Suspense } from "react";

interface EditLibraryPageProps {
  params: Promise<{ libraryId: string }>;
}

async function EditLibraryContent({
  params,
}: {
  params: Promise<{ libraryId: string }>;
}) {
  const { libraryId } = await params;

  return (
    <div className="flex flex-col">
      <Header
        title="Edit Knowledge Item"
        description="Update article content, takeaways, or metadata"
        breadcrumbs={[
          { label: "Library", href: "/library" },
          { label: "Item", href: `/library/${libraryId}` },
          { label: "Edit" },
        ]}
        actions={
          <Link href={`/library/${libraryId}`}>
            <Button variant="outline" size="sm" className="text-xs">
              Cancel
            </Button>
          </Link>
        }
      />

      <div className="mx-auto w-full max-w-2xl p-6">
        <LibraryEditForm params={params} />
      </div>
    </div>
  );
}

export default function EditLibraryPage({ params }: EditLibraryPageProps) {
  return (
    <Suspense fallback={<LoadingText resource="editor" />}>
      <EditLibraryContent params={params} />
    </Suspense>
  );
}
