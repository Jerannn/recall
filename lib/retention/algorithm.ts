// lib/retention/algorithm.ts

export type ReviewRating = "forgot" | "good" | "easy";

export interface ReviewCalculation {
  nextInterval: number; // Days until next review
  repetitionCount: number;
  easeFactor: number;
  nextReviewAt: Date;
}

export function calculateNextReview(
  rating: ReviewRating,
  currentInterval: number,
  repetitionCount: number,
  currentEaseFactor: number,
): ReviewCalculation {
  let nextInterval: number;
  let nextRepetition = repetitionCount;
  let nextEaseFactor = currentEaseFactor;

  if (rating === "forgot") {
    // Reset back to 1 day on failure
    nextInterval = 1;
    nextRepetition = 0;
    nextEaseFactor = Math.max(1.3, currentEaseFactor - 0.2);
  } else if (rating === "good") {
    if (repetitionCount === 0) {
      nextInterval = 1;
    } else if (repetitionCount === 1) {
      nextInterval = 3;
    } else {
      nextInterval = Math.round(currentInterval * currentEaseFactor);
    }
    nextRepetition += 1;
  } else {
    // "easy" - mastered item
    if (repetitionCount === 0) {
      nextInterval = 3;
    } else if (repetitionCount === 1) {
      nextInterval = 7;
    } else {
      nextInterval = Math.round(currentInterval * currentEaseFactor * 1.3);
    }
    nextRepetition += 1;
    nextEaseFactor = Math.min(3.0, currentEaseFactor + 0.15);
  }

  // Calculate the next calendar date
  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + nextInterval);
  nextReviewAt.setHours(4, 0, 0, 0); // Reset to 4:00 AM daily cutoff

  return {
    nextInterval,
    repetitionCount: nextRepetition,
    easeFactor: Number(nextEaseFactor.toFixed(2)),
    nextReviewAt,
  };
}
