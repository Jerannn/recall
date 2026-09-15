import { prisma } from "@/lib/db";

export async function getDashboardData(userId: string) {
  const now = new Date();

  const [dueItems, totalDueCount, totalItems, masteredCount, reviewedTodayCount] =
    await Promise.all([
      // 1. Items due for recall review today (max 5 per session)
      prisma.libraryItem.findMany({
        where: {
          userId,
          nextReviewAt: { lte: now },
        },
        include: {
          libraryItemTags: { include: { tag: true } },
        },
        orderBy: { nextReviewAt: "asc" },
        take: 5,
      }),

      // 2. Total count of items due for review
      prisma.libraryItem.count({
        where: {
          userId,
          nextReviewAt: { lte: now },
        },
      }),

      // 3. Total items in library
      prisma.libraryItem.count({ where: { userId } }),

      // 4. Mastered items (reviewed 4+ times with interval >= 21 days)
      prisma.libraryItem.count({
        where: {
          userId,
          repetitionCount: { gte: 4 },
          reviewInterval: { gte: 21 },
        },
      }),

      // 5. Reviewed today
      prisma.libraryItem.count({
        where: {
          userId,
          lastReviewedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

  return {
    dueItems,
    stats: {
      dueCount: totalDueCount,
      totalItems,
      masteredCount,
      reviewedTodayCount,
    },
  };
}
