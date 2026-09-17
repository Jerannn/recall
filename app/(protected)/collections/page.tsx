import Header from "@/components/layout/Header";
import CollectionForm from "@/features/collection/components/CollectionForm";
import CollectionList from "@/features/collection/components/CollectionList";
import { Suspense } from "react";

export default function CollectionsPage() {
  return (
    <div className="flex flex-col">
      <Header
        title="Collections"
        description="Organize your knowledge into distinct projects or domains"
        actions={<CollectionForm />}
      />

      <div className="max-w-6xl mx-auto w-full p-6">
        <Suspense
          fallback={
            <div className="py-12 text-center text-xs text-muted-foreground animate-pulse">
              Loading collections...
            </div>
          }
        >
          <CollectionList />
        </Suspense>
      </div>
    </div>
  );
}
