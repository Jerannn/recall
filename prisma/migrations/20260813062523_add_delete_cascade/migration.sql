-- DropForeignKey
ALTER TABLE "library_collection" DROP CONSTRAINT "library_collection_libraryItemId_fkey";

-- DropForeignKey
ALTER TABLE "library_item_tag" DROP CONSTRAINT "library_item_tag_libraryItemId_fkey";

-- AddForeignKey
ALTER TABLE "library_item_tag" ADD CONSTRAINT "library_item_tag_libraryItemId_fkey" FOREIGN KEY ("libraryItemId") REFERENCES "library_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_collection" ADD CONSTRAINT "library_collection_libraryItemId_fkey" FOREIGN KEY ("libraryItemId") REFERENCES "library_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
