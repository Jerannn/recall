import Header from "@/components/layout/Header";
import TagForm from "@/features/tag/components/TagForm";
import TagList from "@/features/tag/components/TagList";
import { Suspense } from "react";

export default function TagsPage() {
  return (
    <div>
      <Header title="Tags" />

      <TagForm />

      {/* TODO: add a loading or spinner UI */}
      <Suspense fallback={<p>Loading...</p>}>
        <TagList />
      </Suspense>
    </div>
  );
}
