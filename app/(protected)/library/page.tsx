import Header from "@/components/layout/Header";
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

      <div className="space-y-6 p-6 max-w-6xl mx-auto w-full">
        <Suspense
          fallback={
            <div className="h-9 w-full bg-muted/20 animate-pulse rounded-md" />
          }
        >
          <LibraryFilterContainer />
        </Suspense>

        <Suspense
          fallback={
            <div className="py-12 text-center text-xs text-muted-foreground">
              Loading library items...
            </div>
          }
        >
          <LibraryListContainer searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
