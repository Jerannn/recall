"use client";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useDebounce from "@/hooks/use-debounce";
import { Search, Sparkles } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialQuery = searchParams.get("search") ?? "";
  const [querySearch, setQuerySearch] = useState(initialQuery);
  const debouncedSearch = useDebounce(querySearch, 300);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    const currentParam = searchParams.get("search") ?? "";

    if (trimmed === currentParam) return;

    const params = new URLSearchParams(searchParams.toString());

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      const url = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(url, { scroll: false });
    });
  }, [debouncedSearch, pathname, router, searchParams]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search by keywords or semantic meaning (e.g. 'how does caching work?')..."
          type="text"
          id="search"
          name="search"
          value={querySearch}
          onChange={(e) => setQuerySearch(e.target.value)}
          disabled={isPending}
          autoComplete="off"
          className="pl-10 pr-24 h-11 text-xs sm:text-sm bg-card border-border/70 focus-visible:ring-1 shadow-xs"
        />
        <div className="absolute right-3 flex items-center gap-1.5 pointer-events-none">
          {isPending ? (
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Spinner className="h-3.5 w-3.5" />
              <span>Searching</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 rounded bg-muted/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              <Sparkles className="h-3 w-3 text-purple-500" />
              <span>Hybrid</span>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
