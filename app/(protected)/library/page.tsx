import Header from "@/components/layout/Header";
import Link from "next/link";

export default function LibraryPage() {
  return (
    <div>
      <Header
        title="Library"
        actions={
          <button>
            <Link href="/library/new">Add new library</Link>
          </button>
        }
      />
      Library Page
    </div>
  );
}
