"use cache";

import { prisma } from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";
import { Collection } from "./types";

export const getCollections = async (userId: string): Promise<Collection[]> => {
  cacheTag(`collections-${userId}`);
  cacheLife("hours");

  const result = await prisma.collection.findMany({
    where: { userId },
    include: {
      _count: {
        select: {
          libraryItems: true,
        },
      },
    },
  });

  const collections = result.map(({ _count, ...collection }) => ({
    ...collection,
    items: _count.libraryItems,
  }));

  return collections;
};
