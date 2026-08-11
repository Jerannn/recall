"use client";

import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import useDebounce from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const dates = [
  {
    id: "cmsmzspnn0004356tc2gtcspn",
    name: "Today",
  },
  {
    id: "cmsmzss450006356tai5unjcw",
    name: "Last 7 days",
  },
  {
    id: "cmsmzsvnp0007356twnu0cd7m",
    name: "Last 30 days",
  },
  {
    id: "cmsmzsxva0008356t2p07mwti",
    name: "Last 3 months",
  },
];

interface LibraryFilterProps {
  sourceList?: { source: string }[];
  tagList?: { name: string }[];
}

export default function LibraryFilter({
  sourceList,
  tagList,
}: LibraryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [querySearch, setQuerySearch] = useState(
    searchParams.get("search") || "",
  );

  const debouncedSearch = useDebounce(querySearch, 300);

  useEffect(() => {
    const currentSearchInUrl = searchParams.get("search") || "";

    if (debouncedSearch !== currentSearchInUrl) {
      const params = new URLSearchParams(searchParams);

      if (debouncedSearch.trim()) {
        params.set("search", debouncedSearch.trim());
      } else {
        params.delete("search");
      }

      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, pathname, router, searchParams]);

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        type="text"
        placeholder="Find what you're looking for with keyword title, source, tags"
        value={querySearch}
        onChange={(e) => setQuerySearch(e.target.value)}
      />

      <NativeSelect onChange={handleFilter} name="source">
        <NativeSelectOption value="all">All Sources</NativeSelectOption>
        {sourceList?.map((item) => (
          <NativeSelectOption key={item.source} value={item.source}>
            {item.source}
          </NativeSelectOption>
        ))}
      </NativeSelect>

      <NativeSelect onChange={handleFilter} name="tag">
        <NativeSelectOption value="all">All Tags</NativeSelectOption>
        {tagList?.map((item) => (
          <NativeSelectOption key={item.name} value={item.name}>
            {item.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>

      <NativeSelect name="date">
        <NativeSelectOption value="all">Any date</NativeSelectOption>
        {dates?.map((item) => (
          <NativeSelectOption key={item.id} value={item.id}>
            {item.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}
