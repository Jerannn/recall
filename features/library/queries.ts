"use cache";

import { prisma } from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { cacheLife, cacheTag } from "next/cache";
import { LibraryQueryParams } from "./types";

export const getLibraryItems = async (
  userId: string | undefined,
  queryParams: LibraryQueryParams,
) => {
  cacheTag(`library-${userId}`);
  cacheLife("hours");

  const page = Number(queryParams.page || "1");
  const pageSize = Number(queryParams.pageSize || "3");
  const source = queryParams.source || "all";
  const tag = queryParams.tag || "all";
  const search = queryParams.search || "";

  const where: Prisma.LibraryItemWhereInput = { userId };

  if (source !== "all") {
    where.source = source;
  }

  if (tag !== "all") {
    where.libraryItemTags = {
      some: {
        tag: {
          // name: tag,
          name: { contains: tag, mode: "insensitive" },
        },
      },
    };
  }

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  const [items, totalCount] = await Promise.all([
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
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),

    prisma.libraryItem.count({ where }),
  ]);

  const libraryItems = items.map((item) => ({
    ...item,
    updatedAt: item.updatedAt.toLocaleDateString(),
  }));

  return { libraryItems, totalCount, page, pageSize };
};

export const getLibraryItem = async (
  userId: string | undefined,
  libraryId: string,
) => {
  cacheTag(`library-detail-${userId}-${libraryId}`);
  cacheLife("hours");

  const where: Prisma.LibraryItemWhereInput = { userId, id: libraryId };

  const [items] = await Promise.all([
    prisma.libraryItem.findMany({
      where,
      select: {
        id: true,
        title: true,
        content: true,
        source: true,
        url: true,
        libraryItemTags: {
          select: {
            tagId: true,
          },
        },
        libraryCollections: {
          select: {
            collectionId: true,
          },
        },
      },
    }),
  ]);

  const libraryItems = items.map(
    ({ libraryItemTags, libraryCollections, ...items }) => ({
      ...items,
      collection: libraryCollections[0].collectionId,
      tags: libraryItemTags.map((itemTag) => itemTag.tagId),
    }),
  );

  return { libraryItems };
};

export const getFilterOptions = async (userId: string | undefined) => {
  cacheTag(`library-filter-${userId}`);
  cacheLife("hours");

  const where = { userId };

  const [sourceList, tagList] = await Promise.all([
    prisma.libraryItem.findMany({
      where,
      distinct: ["source"],
      select: {
        source: true,
      },
    }),

    prisma.tag.findMany({
      where,
      distinct: ["name"],
      select: {
        name: true,
      },
    }),
  ]);

  return { sourceList, tagList };
};

export const getLibraryFormOptions = async (userId: string | undefined) => {
  cacheTag(`library-form-options-${userId}`);
  cacheLife("hours");

  const where = { userId };

  const [collections, tags] = await Promise.all([
    prisma.collection.findMany({
      where,
    }),
    prisma.tag.findMany({
      where,
    }),
  ]);

  return { collections, tags };
};
