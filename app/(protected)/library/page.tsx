import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import LibraryList from "@/features/library/components/LibraryList";
import Link from "next/link";
import { Suspense } from "react";

interface LibraryPageProps {
  searchParams: Promise<{ page: string | undefined; pageSize: string }>;
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
      {/* TODO: add a filter here */}

      {/* TODO: add a loading or spinner UI */}
      <Suspense fallback={<p>Loading...</p>}>
        <LibraryList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
