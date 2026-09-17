import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Folder,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface LibraryDetailsProps {
  libraryId: string;
}

export default async function LibraryDetails({ libraryId }: LibraryDetailsProps) {
  const session = await getSession();

  const item = await prisma.libraryItem.findFirst({
    where: {
      id: libraryId,
      userId: session?.user.id,
    },
    include: {
      libraryItemTags: { include: { tag: true } },
      collection: true,
    },
  });

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl py-16 px-6 text-center space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Knowledge Item Not Found
        </h2>
        <p className="text-xs text-muted-foreground">
          This item may have been moved or deleted.
        </p>
        <Link
          href="/library"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Library</span>
        </Link>
      </div>
    );
  }

  // Calculate approximate reading time (200 wpm)
  const wordCount = (item.content || "").split(/\s+/).filter(Boolean).length;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="mx-auto max-w-3xl px-6 py-8 space-y-8">
      {/* Back Link & Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/library"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Library</span>
        </Link>

        {item.collection && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Folder className="h-3.5 w-3.5" />
            <span>{item.collection.name}</span>
          </div>
        )}
      </div>

      {/* Main Title & Metadata Block */}
      <div className="space-y-4 border-b border-border/60 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
          {item.title}
        </h1>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-muted-foreground">
          {/* Source Link */}
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
            >
              <span>{item.source}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span>{item.source}</span>
          )}

          <span className="text-border">·</span>

          {/* Reading Time */}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{readingTimeMin} min read</span>
          </span>

          <span className="text-border">·</span>

          {/* Updated Date */}
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </span>

          <span className="text-border">·</span>

          {/* Recall Status */}
          <span className="inline-flex items-center gap-1 font-mono text-[11px]">
            <RotateCcw className="h-3 w-3" />
            <span>{item.repetitionCount} reviews ({item.reviewInterval}d interval)</span>
          </span>
        </div>

        {/* Tags */}
        {item.libraryItemTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {item.libraryItemTags.map(({ tag }) => (
              <Badge key={tag.id} variant="secondary" className="text-[11px]">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* AI Key Takeaways Callout */}
      {item.summary && (
        <div className="rounded-xl border border-purple-500/20 bg-purple-50/20 p-5 dark:border-purple-900/30 dark:bg-purple-950/15">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-purple-700 dark:text-purple-300">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>AI Summary & Key Takeaways</span>
          </div>
          <div className="prose prose-sm max-w-none text-xs leading-relaxed text-foreground/90 dark:prose-invert">
            <ReactMarkdown>{item.summary}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Article Content / Notes in Clean Markdown Typography */}
      <div className="prose prose-zinc dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed break-words">
        <ReactMarkdown>{item.content}</ReactMarkdown>
      </div>
    </article>
  );
}
