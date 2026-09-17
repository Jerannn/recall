import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/get-session";
import { ChevronRight, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { getSearchFromLibrary } from "../queries";
import { SearchQueryParams, SearchResultItem } from "../types";

interface SearchListProps {
  searchParams: Promise<SearchQueryParams>;
}

export default async function SearchList({ searchParams }: SearchListProps) {
  const session = await getSession();
  const { search } = await searchParams;

  if (!search?.trim()) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/10 p-12 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          Ready to Search
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm">
          Recall uses PostgreSQL Full-Text Search combined with pgvector embeddings to find exact terms or conceptual matches.
        </p>
      </div>
    );
  }

  const results: SearchResultItem[] = await getSearchFromLibrary(
    session?.user.id as string,
    search,
  );

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/10 p-12 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
          <FileText className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          No matches found
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm">
          No knowledge items matched &ldquo;{search}&rdquo;. Try another keyword or question.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>Found {results.length} relevant {results.length === 1 ? "match" : "matches"}</span>
      </div>

      <div className="space-y-3">
        {results.map((item) => (
          <Card
            key={item.id}
            className="border-border/60 transition-all hover:border-border hover:shadow-xs group"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <Link
                    href={`/library/${item.id}`}
                    className="text-sm font-semibold text-foreground hover:underline flex items-center gap-1"
                  >
                    <span>{item.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
                  </Link>
                  <p className="text-[11px] text-muted-foreground">
                    {item.source}
                  </p>
                </div>

                <Badge
                  variant={item.matchType === "hybrid" ? "default" : "outline"}
                  className="text-[10px] uppercase font-mono tracking-wider shrink-0"
                >
                  {item.matchType === "hybrid"
                    ? "Hybrid Match"
                    : item.matchType === "semantic"
                      ? "Semantic"
                      : "Keyword"}
                </Badge>
              </div>

              {/* Render highlighted snippet */}
              <div
                className="text-xs leading-relaxed text-muted-foreground rounded-lg bg-muted/30 p-3 border border-border/40 [&_mark]:rounded [&_mark]:bg-amber-200 [&_mark]:px-1 [&_mark]:font-medium [&_mark]:text-foreground [&_mark]:dark:bg-amber-900/60"
                dangerouslySetInnerHTML={{ __html: item.snippet }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
