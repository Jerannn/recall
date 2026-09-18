import Header from "@/components/layout/Header";
import LoadingText from "@/components/LoadingText";
import { Button } from "@/components/ui/button";
import LibraryCreateFrom from "@/features/library/components/LibraryCreateFrom";
import Link from "next/link";
import { Suspense } from "react";

export default async function NewLibraryPage() {
  return (
    <div className="flex flex-col">
      <Header
        title="Add Note / Article"
        description="Ingest web articles or create manual notes"
        breadcrumbs={[
          { label: "Library", href: "/library" },
          { label: "New Item" },
        ]}
        actions={
          <Link href="/library">
            <Button variant="outline" size="sm" className="text-xs">
              Cancel
            </Button>
          </Link>
        }
      />

      <div className="mx-auto w-full max-w-2xl p-6">
        <Suspense fallback={<LoadingText resource="form" />}>
          <LibraryCreateFrom />
        </Suspense>
      </div>
    </div>
  );
}
