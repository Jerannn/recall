"use cache";

import { prisma } from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

export const getTags = async (userId: string) => {
  cacheTag(`tags-${userId}`);
  cacheLife("hours");

  const result = await prisma.tag.findMany({
    where: { userId },
    include: {
      _count: {
        select: {
          libraryItemTags: true,
        },
      },
    },
  });

  const tags = result.map(({ _count, ...tag }) => ({
    id: tag.id,
    name: tag.name,
    items: _count.libraryItemTags,
  }));

  return tags;
};
