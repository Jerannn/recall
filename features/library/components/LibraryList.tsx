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
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { cacheLife, cacheTag } from "next/cache";

interface LibraryListProps {
  searchParams: Promise<{ page: string | undefined; pageSize: string }>;
}

export const getLibraryItems = async (
  userId: string | undefined,
  page: number,
  pageSize: number,
) => {
  "use cache";

  cacheTag(`user-library-${userId}`);
  cacheLife("hours");
  const where = {
    userId,
  };

  const [libraryItems, totalCount] = await Promise.all([
    prisma.libraryItem.findMany({
      where,
      select: {
        id: true,
        title: true,
        source: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        libraryItemTags: {
          select: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),

    prisma.libraryItem.count({
      where,
    }),
  ]);

  return { libraryItems, totalCount };
};

export default async function LibraryList({ searchParams }: LibraryListProps) {
  const queryParams = await searchParams;
  const page = Number(queryParams.page || "1");
  const pageSize = Number(queryParams.pageSize || "3");

  const session = await getSession();

  const { libraryItems, totalCount } = await getLibraryItems(
    session?.user.id,
    page,
    pageSize,
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
                <TableCell>{item.updatedAt.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">Navigate</TableCell>
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
      />
    </div>
  );
}
