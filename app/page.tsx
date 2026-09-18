import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-foreground selection:text-background">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative mx-auto max-w-5xl space-y-8 px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
          {/* Subtle Tag Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-3.5 py-1 text-xs font-medium text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-purple-500" />
            <span>Read cleaner. Remember longer.</span>
          </div>

          {/* Main Headline */}
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-4xl leading-[1.15] font-bold tracking-tight text-foreground sm:text-6xl">
              Never forget what you read.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Recall extracts clean reader notes from web articles, generates AI
              summaries, and schedules daily active recall reviews using the
              SM-2 algorithm.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/signup">
              <Button
                size="lg"
                className="h-11 gap-2 px-6 text-sm font-medium shadow-xs"
              >
                <span>Start Reading & Retaining</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-6 text-sm font-medium"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Minimalist Interactive Preview Graphic */}
          <div className="mx-auto max-w-3xl pt-12 sm:pt-16">
            <div className="space-y-6 rounded-2xl border border-border/70 bg-card p-6 text-left shadow-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
                    <BrainCircuit className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    Daily Recall Queue · Today&apos;s Focus
                  </span>
                </div>
                <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-medium text-orange-600 dark:text-orange-400">
                  SM-2 Algorithm
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    martinfowler.com
                  </span>
                  <span>·</span>
                  <span>Microservices Architecture Patterns</span>
                </div>
                <h3 className="text-base font-semibold text-foreground sm:text-lg">
                  What are the core trade-offs between orchestration vs.
                  choreography in event-driven systems?
                </h3>
              </div>

              <div className="space-y-2 rounded-xl border border-border/60 bg-muted/30 p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                  Key Takeaway Summary
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Orchestration centralizes workflow control in an orchestrator
                  service (easier to monitor, tighter coupling), while
                  choreography lets services react to domain events
                  independently (higher autonomy, harder to trace).
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                <span className="text-muted-foreground">
                  Rate recall difficulty:
                </span>
                <div className="flex items-center gap-2">
                  <span className="rounded border border-red-200 px-2.5 py-1 text-[11px] font-medium text-red-600">
                    Forgot (1d)
                  </span>
                  <span className="rounded border border-amber-200 px-2.5 py-1 text-[11px] font-medium text-amber-600">
                    Good (+6d)
                  </span>
                  <span className="rounded bg-emerald-600 px-2.5 py-1 text-[11px] font-medium text-white">
                    Easy (Mastered)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars Section */}
        <section className="border-t border-border/60 bg-muted/20 px-6 py-20">
          <div className="mx-auto max-w-5xl space-y-12">
            <div className="mx-auto max-w-xl space-y-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Built to make reading stick
              </h2>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Three tightly integrated systems designed to help you capture,
                find, and retain knowledge.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {/* Pillar 1 */}
              <div className="space-y-3 rounded-xl border border-border/60 bg-card p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  1. Capture & Enrich
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Clean readability parsing strips clutter from articles, while
                  Gemini AI automatically generates concise summaries and
                  relevant tags.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-3 rounded-xl border border-border/60 bg-card p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Search className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  2. Hybrid Search
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Search by keyword or meaning to find anything you&apos;ve ever
                  saved.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-3 rounded-xl border border-border/60 bg-card p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <RotateCcw className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  3. Active Recall Queue
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Smart intervals resurface notes right before you forget them.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border/60 px-6 py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-foreground" />
            <span className="font-semibold text-foreground">Recall</span>
            <span>· Second Brain & Retention System</span>
          </div>
          <p>© 2026 Recall. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
