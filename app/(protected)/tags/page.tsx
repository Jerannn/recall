import Header from "@/components/layout/Header";
import LoadingText from "@/components/LoadingText";
import TagForm from "@/features/tag/components/TagForm";
import TagList from "@/features/tag/components/TagList";
import { Suspense } from "react";

export default function TagsPage() {
  return (
    <div className="flex flex-col">
      <Header
        title="Tags"
        description="Categorize and cross-reference topics across your entire library"
      />

      <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
        <TagForm />

        <Suspense fallback={<LoadingText resource="tags" />}>
          <TagList />
        </Suspense>
      </div>
    </div>
  );
}
