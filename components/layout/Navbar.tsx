import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div>logo</div>
      <div className="flex gap-4">
        {!session ? (
          <button>
            <Link href="/signin">Sign In</Link>
          </button>
        ) : (
          <button>
            <Link href="/dashboard">Dashboard</Link>
          </button>
        )}
      </div>
    </header>
  );
}
