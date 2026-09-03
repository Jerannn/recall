import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/get-session";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getSearchFromLibrary } from "../queries";
import { SearchQueryParams } from "../types";

interface SearchListProps {
  searchParams: Promise<SearchQueryParams>;
}

export default async function SearchList({ searchParams }: SearchListProps) {
  const session = await getSession();
  const { search } = await searchParams;

  if (!search?.trim()) {
    return (
      <div className="text-sm text-muted-foreground">
        Type something above to search through your library.
      </div>
    );
  }

  const items = await getSearchFromLibrary(session?.user.id as string, search);

  if (items.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No results found for &ldquo;{search}&rdquo;.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              <Link
                href={`/library/${item.id}`}
                className="font-medium hover:underline"
              >
                {item.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {item.content && <ReactMarkdown>{item.content}</ReactMarkdown>}
            <div className="flex items-center gap-2 pt-1">
              {item.source && (
                <span className="text-xs text-muted-foreground">
                  Source: {item.source}
                </span>
              )}
              {item.libraryItemTags?.map(({ tag }) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
