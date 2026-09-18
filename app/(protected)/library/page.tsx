import Header from "@/components/layout/Header";
import LoadingText from "@/components/LoadingText";
import { Button } from "@/components/ui/button";
import LibraryFilterContainer from "@/features/library/components/LibraryFilterContainer";
import LibraryListContainer from "@/features/library/components/LibraryListContainer";
import { LibraryQueryParams } from "@/features/library/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface LibraryPageProps {
  searchParams: Promise<LibraryQueryParams>;
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  return (
    <div className="flex flex-col">
      <Header
        title="Library"
        description="All saved articles, notes & references"
        actions={
          <Link href="/library/new">
            <Button size="sm" className="gap-1.5 text-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Add Item</span>
            </Button>
          </Link>
        }
      />

      <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
        <Suspense
          fallback={
            <div className="h-9 w-full animate-pulse rounded-md bg-muted/20" />
          }
        >
          <LibraryFilterContainer />
        </Suspense>

        <Suspense fallback={<LoadingText resource="library items" />}>
          <LibraryListContainer searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
