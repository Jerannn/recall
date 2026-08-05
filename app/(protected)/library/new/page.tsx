import Header from "@/components/layout/Header";
import Link from "next/link";

export default function NewLibraryPage() {
  return (
    <div>
      <Header
        title="Create new library"
        actions={
          <button>
            <Link href="/library">Cancel</Link>
          </button>
        }
      />
    </div>
  );
}
