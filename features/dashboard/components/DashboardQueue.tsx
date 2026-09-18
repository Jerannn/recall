"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Play } from "lucide-react";
import { useState } from "react";
import RecallCard from "./RecallCard";
import StudySessionModal, { RecallItem } from "./StudySessionModal";

interface DashboardQueueProps {
  dueItems: RecallItem[];
}

export default function DashboardQueue({ dueItems }: DashboardQueueProps) {
  const [sessionOpen, setSessionOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Daily Recall Queue
          </h2>
          <p className="text-xs text-muted-foreground">
            Review these items to strengthen long-term memory via spaced
            repetition.
          </p>
        </div>

        {dueItems.length > 0 && (
          <Button
            size="sm"
            onClick={() => setSessionOpen(true)}
            className="gap-2 self-start text-xs font-medium shadow-xs sm:self-auto"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Start Review Session ({dueItems.length})</span>
          </Button>
        )}
      </div>

      {dueItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/10 p-8 text-center sm:p-12">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            You are all caught up for today!
          </h3>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground">
            You&apos;re all caught up for today! New reviews will appear as they
            come due.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {dueItems.map((item) => (
            <RecallCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Study Session Focus Overlay */}
      <StudySessionModal
        items={dueItems}
        isOpen={sessionOpen}
        onClose={() => setSessionOpen(false)}
      />
    </div>
  );
}
