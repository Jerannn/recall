import Header from "@/components/layout/Header";
import SearchContainer from "@/features/search/components/SearchContainer";
import { SearchQueryParams } from "@/features/search/types";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: Promise<SearchQueryParams>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="flex flex-col">
      <Header
        title="Hybrid Search"
        description="Search via full-text keywords or semantic meaning"
      />

      <div className="max-w-4xl mx-auto w-full p-6 space-y-6">
        <Suspense
          fallback={
            <div className="p-8 text-center text-xs text-muted-foreground">
              Loading search...
            </div>
          }
        >
          <SearchContainer searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
