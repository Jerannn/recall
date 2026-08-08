import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import LibraryFormContainer from "@/features/library/components/LibraryFormContainer";
import Link from "next/link";
import { Suspense } from "react";

export default async function NewLibraryPage() {
  return (
    <div>
      <Header
        title="Create new library"
        actions={
          <Button variant="outline">
            <Link href="/library">Cancel</Link>
          </Button>
        }
      />
      <Suspense fallback={<p>Loading...</p>}>
        <LibraryFormContainer />
      </Suspense>
    </div>
  );
}
