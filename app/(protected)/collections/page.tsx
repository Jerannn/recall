import Header from "@/components/layout/Header";
import CollectionForm from "@/features/collection/components/CollectionForm";
import CollectionList from "@/features/collection/components/CollectionList";
import { Suspense } from "react";

export default function CollectionsPage() {
  return (
    <div>
      <Header title="Collections" actions={<CollectionForm />} />

      {/* TODO: add a loading or spinner UI */}
      <Suspense fallback={<p>Loading...</p>}>
        <CollectionList />
      </Suspense>
    </div>
  );
}
