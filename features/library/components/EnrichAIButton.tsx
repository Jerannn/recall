"use client";

import { Button } from "@/components/ui/button";
import { enrichLibraryItemAction } from "@/features/library/actions";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

interface EnrichAIButtonProps {
  libraryId: string;
}

export default function EnrichAIButton({ libraryId }: EnrichAIButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnrich = async () => {
    setLoading(true);
    setError(null);

    const result = await enrichLibraryItemAction(libraryId);

    if (!result.success) {
      setError(result.message || "Enrichment failed");
    }

    setLoading(false);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleEnrich}
        disabled={loading}
        className="gap-1.5"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
            <span>Enriching...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>AI Summarize & Tag</span>
          </>
        )}
      </Button>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
