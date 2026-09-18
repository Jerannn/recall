import { PaginationControls } from "@/components/PaginationControls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSession } from "@/lib/get-session";
import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { getLibraryItems } from "../queries";
import { LibraryQueryParams } from "../types";
import LibraryItemActions from "./LibraryItemActions";

interface LibraryListProps {
  searchParams: Promise<LibraryQueryParams>;
}

export default async function LibraryList({ searchParams }: LibraryListProps) {
  const queryParams = await searchParams;

  const session = await getSession();
  if (!session?.user?.id) {
    return (
      <div className="p-8 text-center text-xs text-muted-foreground">
        Please sign in to view your library.
      </div>
    );
  }

  const { libraryItems, totalCount, page, pageSize } = await getLibraryItems(
    session?.user.id,
    queryParams,
  );

  if (!libraryItems.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/10 p-12 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <BookOpen className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          No library items found
        </h3>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground">
          Save web articles, documentation, or your own notes to build your
          personal knowledge base.
        </p>
        <Link href="/library/new" className="mt-4">
          <Button size="sm" className="gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add First Item
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-xs">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[45%] text-xs font-semibold">
                Title
              </TableHead>
              <TableHead className="w-[18%] text-xs font-semibold">
                Source
              </TableHead>
              <TableHead className="w-[20%] text-xs font-semibold">
                Tags
              </TableHead>
              <TableHead className="w-[12%] text-xs font-semibold">
                Date
              </TableHead>
              <TableHead className="w-[5%] text-right text-xs font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {libraryItems.map((item) => {
              const formattedDate = new Date(item.updatedAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                },
              );

              return (
                <TableRow
                  key={item.id}
                  className="group transition-colors hover:bg-muted/30"
                >
                  <TableCell className="font-medium">
                    <Link
                      href={`/library/${item.id}`}
                      className="line-clamp-1 text-xs font-semibold text-foreground hover:underline"
                    >
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    <span className="block max-w-37.5 truncate">
                      {item.source}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-1">
                      {item.libraryItemTags.slice(0, 3).map(({ tag }) => (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="px-1.5 py-0 text-[10px]"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                      {item.libraryItemTags.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">
                          +{item.libraryItemTags.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap text-muted-foreground">
                    {formattedDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <LibraryItemActions id={item.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {totalCount > pageSize && (
        <div className="flex justify-end pt-2">
          <PaginationControls
            totalCount={totalCount}
            pageSize={pageSize}
            page={page}
            pageSizeSelectOptions={{
              pageSizeOptions: [5, 10, 20, 50],
            }}
            navigationMode="router"
          />
        </div>
      )}
    </div>
  );
}
