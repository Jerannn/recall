/*
  Warnings:

  - You are about to drop the `library_collection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "library_collection" DROP CONSTRAINT "library_collection_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "library_collection" DROP CONSTRAINT "library_collection_libraryItemId_fkey";

-- DropIndex
DROP INDEX "tag_name_key";

-- AlterTable
ALTER TABLE "collection" ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "color" SET DEFAULT '#000';

-- AlterTable
ALTER TABLE "library_item" ADD COLUMN     "collectionId" TEXT;

-- DropTable
DROP TABLE "library_collection";

-- AddForeignKey
ALTER TABLE "library_item" ADD CONSTRAINT "library_item_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
