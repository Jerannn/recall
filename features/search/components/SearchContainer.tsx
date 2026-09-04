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
    <div>
      <SearchForm />

      <Suspense
        key={suspenseKey}
        fallback={<p>Searching inside of your library...</p>}
      >
        <SearchList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
