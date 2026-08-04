/*
  Warnings:

  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KnowledgeItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KnowledgeItemTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_userId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeItem" DROP CONSTRAINT "KnowledgeItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeItemTag" DROP CONSTRAINT "KnowledgeItemTag_knowledgeItemId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeItemTag" DROP CONSTRAINT "KnowledgeItemTag_tagId_fkey";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "KnowledgeItem";

-- DropTable
DROP TABLE "KnowledgeItemTag";

-- CreateTable
CREATE TABLE "knowledge_item" (
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

    CONSTRAINT "knowledge_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_item_tag" (
    "knowledgeItemId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "knowledge_item_tag_pkey" PRIMARY KEY ("knowledgeItemId","tagId")
);

-- CreateTable
CREATE TABLE "collection" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(7) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "knowledge_item_userId_idx" ON "knowledge_item"("userId");

-- AddForeignKey
ALTER TABLE "knowledge_item" ADD CONSTRAINT "knowledge_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_item_tag" ADD CONSTRAINT "knowledge_item_tag_knowledgeItemId_fkey" FOREIGN KEY ("knowledgeItemId") REFERENCES "knowledge_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_item_tag" ADD CONSTRAINT "knowledge_item_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
