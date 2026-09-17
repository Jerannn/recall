import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/get-session";
import { ArrowRight, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/60 bg-background/80 px-6 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background shadow-xs transition-transform group-hover:scale-105">
          <BrainCircuit className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Recall
          </span>
          <span className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
            Second Brain
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        <Suspense
          fallback={
            <div className="h-8 w-20 bg-muted/40 animate-pulse rounded-md" />
          }
        >
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
      <div className="flex items-center gap-2">
        <Link href="/signin">
          <Button variant="ghost" size="sm" className="text-xs">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm" className="text-xs gap-1.5 shadow-xs">
            <span>Get Started</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Link href="/dashboard">
      <Button size="sm" className="text-xs gap-1.5 shadow-xs">
        <span>Go to Dashboard</span>
        <ArrowRight className="h-3 w-3" />
      </Button>
    </Link>
  );
}
