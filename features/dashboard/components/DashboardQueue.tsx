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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Daily Recall Queue
          </h2>
          <p className="text-xs text-muted-foreground">
            Review these items to strengthen long-term memory via spaced repetition.
          </p>
        </div>

        {dueItems.length > 0 && (
          <Button
            size="sm"
            onClick={() => setSessionOpen(true)}
            className="gap-2 text-xs font-medium self-start sm:self-auto shadow-xs"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Start Review Session ({dueItems.length})</span>
          </Button>
        )}
      </div>

      {dueItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/10 p-8 text-center sm:p-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-3">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            You are all caught up for today!
          </h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-sm">
            No items currently due for recall review. New items will appear according to your spaced repetition schedule.
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
