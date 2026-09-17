"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewRating } from "@/lib/retention/algorithm";
import { CheckCircle2, ChevronRight, Eye, EyeOff, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { submitRecallReviewAction } from "../actions";

interface RecallItem {
  id: string;
  title: string;
  summary: string | null;
  source: string;
  repetitionCount: number;
  libraryItemTags: Array<{ tag: { id: string; name: string } }>;
}

export default function RecallCard({ item }: { item: RecallItem }) {
  const [showSummary, setShowSummary] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [intervalFeedback, setIntervalFeedback] = useState<number | null>(null);

  const handleRate = async (rating: ReviewRating) => {
    setIsSubmitting(true);
    const result = await submitRecallReviewAction(item.id, rating);
    if (result.success) {
      setIntervalFeedback(result.nextIntervalDays || 1);
      setCompleted(true);
    }
    setIsSubmitting(false);
  };

  if (completed) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-50/10 px-4 py-3 text-xs dark:bg-emerald-950/10">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle2 className="h-4 w-4" />
          <span>Reviewed! Next review scheduled in {intervalFeedback} {intervalFeedback === 1 ? "day" : "days"}.</span>
        </div>
        <span className="text-muted-foreground/60 line-through text-[11px] truncate max-w-xs">
          {item.title}
        </span>
      </div>
    );
  }

  return (
    <Card className="border-border/60 transition-all hover:border-border hover:shadow-xs">
      <CardContent className="p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <Link
              href={`/library/${item.id}`}
              className="text-sm font-semibold text-foreground hover:underline flex items-center gap-1 group"
            >
              <span>{item.title}</span>
              <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
            </Link>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span>{item.source}</span>
              <span>·</span>
              <span className="font-mono">Recall #{item.repetitionCount + 1}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {item.libraryItemTags.slice(0, 3).map(({ tag }) => (
              <Badge key={tag.id} variant="secondary" className="text-[10px]">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Toggle Summary Reveal */}
        <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-purple-500" />
              Active Recall Takeaways
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-[11px]"
              onClick={() => setShowSummary(!showSummary)}
            >
              {showSummary ? (
                <>
                  <EyeOff className="mr-1 h-3 w-3" /> Hide
                </>
              ) : (
                <>
                  <Eye className="mr-1 h-3 w-3" /> Reveal
                </>
              )}
            </Button>
          </div>

          {showSummary ? (
            <div className="prose prose-sm max-w-none border-t border-border/40 mt-2.5 pt-2 text-xs text-foreground leading-relaxed dark:prose-invert">
              <ReactMarkdown>
                {item.summary || "No summary available for this item."}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-[11px] text-muted-foreground italic mt-1">
              Recall the main points in your head first, then click Reveal to check.
            </p>
          )}
        </div>

        {/* Rating Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3">
          <span className="text-[11px] text-muted-foreground">
            Grade your retention:
          </span>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2.5 text-xs text-red-600 hover:bg-red-500/10 hover:border-red-500/30 dark:hover:bg-red-950/20"
              disabled={isSubmitting}
              onClick={() => handleRate("forgot")}
            >
              <RotateCcw className="mr-1 h-3 w-3" /> Forgot (1d)
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2.5 text-xs text-amber-600 hover:bg-amber-500/10 hover:border-amber-500/30 dark:hover:bg-amber-950/20"
              disabled={isSubmitting}
              onClick={() => handleRate("good")}
            >
              Good (+Interval)
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2.5 text-xs text-emerald-600 hover:bg-emerald-500/10 hover:border-emerald-500/30 dark:hover:bg-emerald-950/20"
              disabled={isSubmitting}
              onClick={() => handleRate("easy")}
            >
              <CheckCircle2 className="mr-1 h-3 w-3" /> Easy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
