/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `knowledge_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `knowledge_item_tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "knowledge_item" DROP CONSTRAINT "knowledge_item_userId_fkey";

-- DropForeignKey
ALTER TABLE "knowledge_item_tag" DROP CONSTRAINT "knowledge_item_tag_knowledgeItemId_fkey";

-- DropForeignKey
ALTER TABLE "knowledge_item_tag" DROP CONSTRAINT "knowledge_item_tag_tagId_fkey";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "knowledge_item";

-- DropTable
DROP TABLE "knowledge_item_tag";

-- CreateTable
CREATE TABLE "library_item" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "source" VARCHAR(255) NOT NULL,
    "sourceId" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "library_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "library_item_tag" (
    "libraryItemId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "library_item_tag_pkey" PRIMARY KEY ("libraryItemId","tagId")
);

-- CreateIndex
CREATE INDEX "library_item_userId_idx" ON "library_item"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- AddForeignKey
ALTER TABLE "library_item" ADD CONSTRAINT "library_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_item_tag" ADD CONSTRAINT "library_item_tag_libraryItemId_fkey" FOREIGN KEY ("libraryItemId") REFERENCES "library_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_item_tag" ADD CONSTRAINT "library_item_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
