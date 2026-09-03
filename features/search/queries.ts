"use cache";

import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { cacheLife, cacheTag } from "next/cache";

export const getSearchFromLibrary = async (userId: string, search: string) => {
  cacheTag(`search-${userId}`);
  cacheLife("hours");

  const trimmed = search?.trim();

  // If no search query is provided, return empty array or all items depending on requirement
  if (!trimmed) {
    return [];
  }

  const where: Prisma.LibraryItemWhereInput = {
    userId,
    OR: [
      { title: { contains: trimmed, mode: "insensitive" } },
      { content: { contains: trimmed, mode: "insensitive" } },
      { source: { contains: trimmed, mode: "insensitive" } },
    ],
  };

  const results = await prisma.libraryItem.findMany({
    where,
    include: {
      libraryItemTags: {
        include: { tag: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return results;
};
