"use client";

import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import useDebounce from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

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

  const querySource = searchParams.get("source") || "";
  const queryTag = searchParams.get("tag") || "";
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

    if (value === "all") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  console.log(queryTag);

  return (
    <div className="flex items-center gap-3">
      <Input
        type="text"
        placeholder="Find what you're looking for with keyword title"
        value={querySearch}
        onChange={(e) => setQuerySearch(e.target.value)}
      />

      {/* TODO: the source need to have its own table and once the user is creating a library item it check if it is already exist, if not create if yes then skip */}
      <NativeSelect
        value={querySource || "all"}
        onChange={handleFilter}
        name="source"
      >
        <NativeSelectOption value="all">All Sources</NativeSelectOption>
        {sourceList?.map((item) => (
          <NativeSelectOption key={item.source} value={item.source}>
            {item.source}
          </NativeSelectOption>
        ))}
      </NativeSelect>

      <NativeSelect
        value={queryTag || "all"}
        onChange={handleFilter}
        name="tag"
      >
        <NativeSelectOption value="all">All Tags</NativeSelectOption>
        {tagList?.map((item) => (
          <NativeSelectOption key={item.name} value={item.name}>
            {item.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}
