import Header from "@/components/layout/Header";
import LoadingText from "@/components/LoadingText";
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

      <div className="mx-auto w-full max-w-4xl space-y-6 p-6">
        <Suspense fallback={<LoadingText resource="search" />}>
          <SearchContainer searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
