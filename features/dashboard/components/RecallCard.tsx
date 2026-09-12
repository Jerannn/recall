"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewRating } from "@/lib/retention/algorithm";
import { CheckCircle2, Eye, EyeOff, RotateCcw, Sparkles } from "lucide-react";
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
      <Card className="border-emerald-500/30 bg-emerald-50/20 p-4 dark:bg-emerald-950/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <span>Reviewed! Next review in {intervalFeedback} days.</span>
          </div>
          <span className="text-xs text-muted-foreground line-through">
            {item.title}
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="transition-colors hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/library/${item.id}`} className="hover:underline">
              <CardTitle className="text-base font-semibold">
                {item.title}
              </CardTitle>
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {item.source}
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            Recall #{item.repetitionCount + 1}
          </Badge>
        </div>

        <div className="flex gap-1.5 pt-2">
          {item.libraryItemTags.map((t) => (
            <Badge key={t.tag.id} variant="secondary" className="text-xs">
              {t.tag.name}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Toggle Summary Reveal */}
        <div className="rounded-md border bg-muted/40 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
              Recall Challenge
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setShowSummary(!showSummary)}
            >
              {showSummary ? (
                <>
                  <EyeOff className="mr-1 h-3.5 w-3.5" /> Hide
                </>
              ) : (
                <>
                  <Eye className="mr-1 h-3.5 w-3.5" /> Reveal Key Takeaways
                </>
              )}
            </Button>
          </div>

          {showSummary ? (
            <div className="prose prose-sm max-w-none text-xs text-foreground dark:prose-invert">
              <ReactMarkdown>
                {item.summary || "No summary available for this item."}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              Try to recall the main takeaways before clicking Reveal!
            </p>
          )}
        </div>

        {/* Action Rating Buttons */}
        <div className="flex items-center justify-end gap-2 border-t pt-2">
          <span className="mr-auto text-xs text-muted-foreground">
            How well did you recall this?
          </span>

          <Button
            size="sm"
            variant="outline"
            className="h-8 border-red-200 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            disabled={isSubmitting}
            onClick={() => handleRate("forgot")}
          >
            <RotateCcw className="mr-1 h-3.5 w-3.5" /> Forgot (1d)
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 border-yellow-200 text-xs text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
            disabled={isSubmitting}
            onClick={() => handleRate("good")}
          >
            Good (+Interval)
          </Button>

          <Button
            size="sm"
            variant="default"
            className="h-8 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
            disabled={isSubmitting}
            onClick={() => handleRate("easy")}
          >
            Easy (Mastered)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
