import { Suspense } from "react";
import { LibraryQueryParams } from "../types";
import LibraryList from "./LibraryList";

interface KeyedSuspenseProps {
  searchParams: Promise<LibraryQueryParams>;
}

export default async function LibraryListContainer({
  searchParams,
}: KeyedSuspenseProps) {
  const query = await searchParams;
  const key = JSON.stringify(query);

  // TODO: add a loading or spinner UI
  return (
    <Suspense fallback={<p>Loading...</p>} key={key}>
      <LibraryList searchParams={searchParams} />
    </Suspense>
  );
}
