import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LibraryPage() {
  return (
    <div>
      <Header
        title="Library"
        actions={
          <Button>
            <Link href="/library/new">Add new library</Link>
          </Button>
        }
      />
      Library Page
    </div>
  );
}
