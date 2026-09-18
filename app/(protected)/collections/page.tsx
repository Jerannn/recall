import Header from "@/components/layout/Header";
import LoadingText from "@/components/LoadingText";
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

      <div className="mx-auto w-full max-w-6xl p-6">
        <Suspense fallback={<LoadingText resource="collections" />}>
          <CollectionList />
        </Suspense>
      </div>
    </div>
  );
}
