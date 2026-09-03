import Header from "@/components/layout/Header";
import SearchContainer from "@/features/search/components/SearchContainer";
import { SearchQueryParams } from "@/features/search/types";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: Promise<SearchQueryParams>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div>
      <Header title="Search" />

      <Suspense fallback={<p>Loading...</p>}>
        <SearchContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
