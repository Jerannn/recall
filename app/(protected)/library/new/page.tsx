import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import LibraryCreateFrom from "@/features/library/components/LibraryCreateFrom";
import Link from "next/link";
import { Suspense } from "react";

export default async function NewLibraryPage() {
  return (
    <div className="flex flex-col">
      <Header
        title="Add Knowledge Item"
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

      <div className="max-w-2xl mx-auto w-full p-6">
        <Suspense
          fallback={
            <div className="p-8 text-center text-xs text-muted-foreground">
              Loading form...
            </div>
          }
        >
          <LibraryCreateFrom />
        </Suspense>
      </div>
    </div>
  );
}
