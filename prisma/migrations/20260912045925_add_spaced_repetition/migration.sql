-- AlterTable: Add the spaced repetition fields
ALTER TABLE "library_item" 
ADD COLUMN IF NOT EXISTS "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
ADD COLUMN IF NOT EXISTS "lastReviewedAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "nextReviewAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS "repetitionCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS "reviewInterval" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex for due items query
CREATE INDEX IF NOT EXISTS "library_item_userId_nextReviewAt_idx" ON "library_item"("userId", "nextReviewAt");

-- Create unique constraint for User-scoped Tags
CREATE UNIQUE INDEX IF NOT EXISTS "tag_userId_name_key" ON "tag"("userId", "name");