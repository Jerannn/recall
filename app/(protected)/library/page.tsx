import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import LibraryFilterContainer from "@/features/library/components/LibraryFilterContainer";
import LibraryListContainer from "@/features/library/components/LibraryListContainer";
import { LibraryQueryParams } from "@/features/library/types";
import Link from "next/link";
import { Suspense } from "react";

interface LibraryPageProps {
  searchParams: Promise<LibraryQueryParams>;
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  return (
    <div>
      <Header
        title="Library"
        actions={
          <Link href="/library/new">
            <Button>Add new library</Button>
          </Link>
        }
      />

      {/* TODO: add a loading or spinner UI */}
      <Suspense fallback={<p>Loading...</p>}>
        <LibraryFilterContainer />
      </Suspense>

      {/* TODO: add a loading or spinner UI */}
      <Suspense fallback={<p>Loading...</p>}>
        <LibraryListContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
