import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import LibraryForm from "@/features/library/components/LibraryForm";
import Link from "next/link";

export default function NewLibraryPage() {
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

      <LibraryForm />
    </div>
  );
}
