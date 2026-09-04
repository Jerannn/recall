/*
  Warnings:

  - Made the column `collectionId` on table `library_item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "library_item" DROP CONSTRAINT "library_item_collectionId_fkey";

-- AlterTable
ALTER TABLE "library_item" ALTER COLUMN "collectionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "library_item" ADD CONSTRAINT "library_item_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
