"use client";

import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import useDebounce from "@/hooks/use-debounce";
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
    <form onSubmit={(e) => e.preventDefault()} className="max-w-md">
      <Field>
        <InputGroup>
          <InputGroupInput
            placeholder="Get inside in your library"
            type="text"
            id="search"
            name="search"
            value={querySearch}
            onChange={(e) => setQuerySearch(e.target.value)}
            disabled={isPending}
            autoComplete="off"
          />
          <InputGroupAddon align="inline-end">
            {isPending ? (
              <>
                <InputGroupText>Searching...</InputGroupText>
                <Spinner />
              </>
            ) : (
              <InputGroupButton type="submit" variant="secondary">
                Find
              </InputGroupButton>
            )}
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </form>
  );
}
