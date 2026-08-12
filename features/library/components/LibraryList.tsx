import { PaginationControls } from "@/components/PaginationControls";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSession } from "@/lib/get-session";
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
    return <p>Please sign in to view your library.</p>;
  }

  const { libraryItems, totalCount, page, pageSize } = await getLibraryItems(
    session?.user.id,
    queryParams,
  );

  return (
    <div>
      <Table className="overflow-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-100">Title</TableHead>
            <TableHead className="w-50">Source</TableHead>
            <TableHead className="w-50">Tags</TableHead>
            <TableHead className="w-50">Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!libraryItems.length && (
            <TableRow>
              <TableCell>No data found</TableCell>
            </TableRow>
          )}
          {libraryItems.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell className="flex items-center gap-1">
                  {item.libraryItemTags.map(({ tag }) => (
                    <Badge key={tag.id}>{tag.name}</Badge>
                  ))}
                </TableCell>
                <TableCell>{item.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <LibraryItemActions id={item.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

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
  );
}
