"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReviewRating } from "@/lib/retention/algorithm";
import {
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Keyboard,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { submitRecallReviewAction } from "../actions";

export interface RecallItem {
  id: string;
  title: string;
  summary: string | null;
  source: string;
  repetitionCount: number;
  libraryItemTags: Array<{ tag: { id: string; name: string } }>;
}

interface StudySessionModalProps {
  items: RecallItem[];
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export default function StudySessionModal({
  items,
  isOpen,
  onClose,
  onComplete,
}: StudySessionModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTakeaways, setShowTakeaways] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = items[currentIndex];
  const progressPercent = items.length
    ? Math.round(((currentIndex + (isFinished ? 1 : 0)) / items.length) * 100)
    : 100;

  const handleRate = useCallback(
    async (rating: ReviewRating) => {
      if (!currentItem || isSubmitting) return;

      setIsSubmitting(true);
      await submitRecallReviewAction(currentItem.id, rating);
      setIsSubmitting(false);

      setReviewedCount((prev) => prev + 1);
      setShowTakeaways(false);

      if (currentIndex + 1 < items.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
        if (onComplete) onComplete();
      }
    },
    [currentItem, currentIndex, items.length, isSubmitting, onComplete],
  );

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isOpen || isFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        setShowTakeaways((prev) => !prev);
      } else if (e.key === "1") {
        e.preventDefault();
        handleRate("forgot");
      } else if (e.key === "2") {
        e.preventDefault();
        handleRate("good");
      } else if (e.key === "3") {
        e.preventDefault();
        handleRate("easy");
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFinished, handleRate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4 animate-in fade-in-0 duration-200">
      <div className="relative flex w-full max-w-2xl flex-col rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden">
        {/* Top Navigation & Progress */}
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {isFinished ? items.length : currentIndex + 1}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              of {items.length} items to review
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Keyboard className="h-3.5 w-3.5" />
              <span>Space: Reveal · 1/2/3: Grade · Esc: Exit</span>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Slim Progress Bar */}
        <div className="h-1 w-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Content Body */}
        {isFinished ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <Trophy className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Recall Session Complete!
              </h2>
              <p className="text-xs text-muted-foreground max-w-sm">
                You successfully reviewed {reviewedCount} knowledge{" "}
                {reviewedCount === 1 ? "item" : "items"}. Your memory intervals
                have been updated.
              </p>
            </div>
            <Button onClick={onClose} className="mt-4 gap-2 text-xs">
              Back to Dashboard
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col p-6 sm:p-8 space-y-6">
            {/* Metadata & Tag row */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {currentItem?.source}
                </span>
                <span className="text-xs text-muted-foreground/50">·</span>
                <Badge variant="outline" className="text-[10px] font-mono">
                  Recall #{currentItem?.repetitionCount + 1}
                </Badge>
              </div>

              <div className="flex items-center gap-1.5">
                {currentItem?.libraryItemTags.map(({ tag }) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="text-[11px]"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Prompt & Title */}
            <div className="space-y-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Knowledge Prompt
              </span>
              <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
                {currentItem?.title}
              </h3>
            </div>

            {/* AI Summary / Key Takeaways Reveal Box */}
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4 transition-all">
              <div className="flex items-center justify-between pb-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                  Key Takeaways
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs font-medium"
                  onClick={() => setShowTakeaways(!showTakeaways)}
                >
                  {showTakeaways ? (
                    <>
                      <EyeOff className="mr-1.5 h-3.5 w-3.5" /> Hide Takeaways
                    </>
                  ) : (
                    <>
                      <Eye className="mr-1.5 h-3.5 w-3.5" /> Reveal Takeaways
                    </>
                  )}
                </Button>
              </div>

              {showTakeaways ? (
                <div className="prose prose-sm max-w-none border-t border-border/50 pt-3 text-xs leading-relaxed text-foreground dark:prose-invert">
                  <ReactMarkdown>
                    {currentItem?.summary || "No summary available for this item."}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  Attempt to recall what you learned before revealing the summary...
                </p>
              )}
            </div>

            {/* Grading Choice Strip */}
            <div className="space-y-2 border-t border-border/60 pt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Rate your recall quality:</span>
                <span className="hidden sm:inline text-[11px]">
                  Select response or press [1, 2, 3]
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => handleRate("forgot")}
                  className="flex flex-col items-center justify-center h-14 border-red-200/80 hover:bg-red-500/10 hover:border-red-500/50 dark:border-red-950"
                >
                  <div className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Forgot</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Key [1] · Reset 1d
                  </span>
                </Button>

                <Button
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => handleRate("good")}
                  className="flex flex-col items-center justify-center h-14 border-amber-200/80 hover:bg-amber-500/10 hover:border-amber-500/50 dark:border-amber-950"
                >
                  <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                    <span>Good</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Key [2] · +Interval
                  </span>
                </Button>

                <Button
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => handleRate("easy")}
                  className="flex flex-col items-center justify-center h-14 border-emerald-200/80 hover:bg-emerald-500/10 hover:border-emerald-500/50 dark:border-emerald-950"
                >
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Easy</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Key [3] · Mastered
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
