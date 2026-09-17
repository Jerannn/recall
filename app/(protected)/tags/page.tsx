import Header from "@/components/layout/Header";
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

      <div className="max-w-6xl mx-auto w-full p-6 space-y-6">
        <TagForm />

        <Suspense
          fallback={
            <div className="py-12 text-center text-xs text-muted-foreground animate-pulse">
              Loading tags...
            </div>
          }
        >
          <TagList />
        </Suspense>
      </div>
    </div>
  );
}
