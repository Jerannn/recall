"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { calculateNextReview, ReviewRating } from "@/lib/retention/algorithm";
import { updateTag } from "next/cache";

export async function submitRecallReviewAction(
  libraryItemId: string,
  rating: ReviewRating,
) {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const item = await prisma.libraryItem.findUnique({
    where: { id: libraryItemId, userId: session.user.id },
  });

  if (!item) {
    return { success: false, message: "Library item not found." };
  }

  // 1. Calculate new review interval
  const calculation = calculateNextReview(
    rating,
    item.reviewInterval,
    item.repetitionCount,
    item.easeFactor,
  );

  // 2. Save updated schedule to DB
  await prisma.libraryItem.update({
    where: { id: libraryItemId },
    data: {
      reviewInterval: calculation.nextInterval,
      repetitionCount: calculation.repetitionCount,
      easeFactor: calculation.easeFactor,
      nextReviewAt: calculation.nextReviewAt,
      lastReviewedAt: new Date(),
    },
  });

  // 3. Invalidate dashboard cache
  updateTag(`dashboard-${session.user.id}`);
  updateTag(`library-${session.user.id}`);

  return {
    success: true,
    nextIntervalDays: calculation.nextInterval,
  };
}
