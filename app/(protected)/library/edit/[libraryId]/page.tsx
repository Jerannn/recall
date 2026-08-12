import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import LibraryEditForm from "@/features/library/components/LibraryEditForm";
import Link from "next/link";
import { Suspense } from "react";

interface EditLibraryPageProps {
  params: Promise<{ libraryId: string }>;
}

export default function EditLibraryPage({ params }: EditLibraryPageProps) {
  return (
    <div>
      <Header
        title="Edit library"
        actions={
          <Button variant="outline">
            <Link href="/library">Cancel</Link>
          </Button>
        }
      />
      <Suspense fallback={<p>Loading...</p>}>
        <LibraryEditForm params={params} />
      </Suspense>
    </div>
  );
}
