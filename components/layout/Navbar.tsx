import { getSession } from "@/lib/get-session";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "../ui/button";

export default async function Navbar() {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <div>logo</div>
      <div className="flex gap-4">
        <Suspense fallback={<p>Loading...</p>}>
          <NavButtons />
        </Suspense>
      </div>
    </header>
  );
}

async function NavButtons() {
  const session = await getSession();

  if (!session) {
    return (
      <Button>
        <Link href="/signin">Sign In</Link>
      </Button>
    );
  }

  return (
    <Button>
      <Link href="/dashboard">Dashboard</Link>
    </Button>
  );
}
