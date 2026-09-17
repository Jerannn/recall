import { Suspense } from "react";
import { SearchQueryParams } from "../types";
import SearchForm from "./SearchForm";
import SearchList from "./SearchList";

interface SearchContainerProps {
  searchParams: Promise<SearchQueryParams>;
}

export default async function SearchContainer({
  searchParams,
}: SearchContainerProps) {
  const query = await searchParams;
  const suspenseKey = query.search || "empty";

  return (
    <div className="space-y-6">
      <SearchForm />

      <Suspense
        key={suspenseKey}
        fallback={
          <div className="py-12 text-center text-xs text-muted-foreground animate-pulse">
            Searching inside of your library...
          </div>
        }
      >
        <SearchList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
