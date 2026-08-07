-- AlterTable
ALTER TABLE "library_item" ALTER COLUMN "sourceId" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- CreateTable
CREATE TABLE "library_collection" (
    "libraryItemId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "library_collection_pkey" PRIMARY KEY ("libraryItemId","collectionId")
);

-- AddForeignKey
ALTER TABLE "library_collection" ADD CONSTRAINT "library_collection_libraryItemId_fkey" FOREIGN KEY ("libraryItemId") REFERENCES "library_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_collection" ADD CONSTRAINT "library_collection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
