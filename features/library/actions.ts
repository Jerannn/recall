"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { librarySchema } from "./schema";
import { LibraryFormState } from "./types";

import { generateContentEnrichment } from "@/lib/ai/enrichment";
import { extractUrlContent } from "@/lib/ingestion/extractor";

export const fetchUrlContentAction = async (url: string) => {
  const session = await getSession();
  if (!session) {
    return {
      success: false,
      error: "Unauthorized: You must be logged in to fetch content.",
    };
  }
  if (!url || !url.trim()) {
    return {
      success: false,
      error: "Please enter a valid URL.",
    };
  }
  return await extractUrlContent(url);
};

export const createLibrary = async (
  prevState: LibraryFormState,
  formData: FormData,
): Promise<LibraryFormState> => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message:
        "Unauthorized: You don't have permission to perform this action!",
    };
  }

  const rawFields = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    source: formData.get("source") as string,
    tags: formData.getAll("tags") as string[],
    collectionId: formData.get("collectionId") as string,
    url: formData.get("url") as string,
  };

  const result = librarySchema.safeParse(rawFields);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((error) => {
      errors[error.path[0] as string] = error.message;
    });

    return {
      success: false,
      message: "Please correct the validation errors below.",
      errors: errors,
    };
  }

  const libraryItem = await prisma.$transaction(async (tx) => {
    const data = await tx.libraryItem.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        source: result.data.source,
        url: result.data.url,
        userId: session.user.id,
        collectionId: result.data.collectionId,
      },
    });

    await tx.libraryItemTag.createMany({
      data: result.data.tags.map((tagId) => ({
        libraryItemId: data.id,
        tagId,
      })),
    });

    return data;
  });

  if (!libraryItem) {
    return {
      success: false,
      message: "Unable to create the library item. Please try again.",
    };
  }
  updateTag(`library-${session.user.id}`);
  updateTag(`collections-${session.user.id}`);
  updateTag(`tags-${session.user.id}`);
  redirect(`/library/${libraryItem.id}`);
};

export const updateLibrary = async (
  libraryItemId: string,
  prevState: LibraryFormState,
  formData: FormData,
): Promise<LibraryFormState> => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message:
        "Unauthorized: You don't have permission to perform this action!",
    };
  }

  const rawFields = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    source: formData.get("source") as string,
    tags: formData.getAll("tags") as string[],
    collectionId: formData.get("collectionId") as string,
    url: formData.get("url") as string,
  };

  const result = librarySchema.safeParse(rawFields);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((error) => {
      errors[error.path[0] as string] = error.message;
    });

    return {
      success: false,
      message: "Please correct the validation errors below.",
      errors: errors,
    };
  }

  const libraryItem = await prisma.$transaction(async (tx) => {
    const data = await tx.libraryItem.update({
      where: {
        id: libraryItemId,
        userId: session?.user.id,
      },
      data: {
        title: result.data.title,
        content: result.data.content,
        source: result.data.source,
        url: result.data.url,
        userId: session.user.id,
        collectionId: result.data.collectionId,
      },
    });

    if (result.data.tags.length > 0) {
      await tx.libraryItemTag.deleteMany({
        where: { libraryItemId },
      });

      await tx.libraryItemTag.createMany({
        data: result.data.tags.map((tagId) => ({
          libraryItemId: data.id,
          tagId,
        })),
      });
    }

    return data;
  });

  if (!libraryItem) {
    return {
      success: false,
      message: "Unable to update the library item. Please try again.",
    };
  }

  updateTag(`library-${session.user.id}`);
  updateTag(`library-detail-${session.user.id}-${libraryItemId}`);
  updateTag(`collections-${session.user.id}`);
  updateTag(`tags-${session.user.id}`);
  redirect(`/library/${libraryItem.id}`);
};

export const deleteLibrary = async (
  libraryId: string,
  isControlled: boolean,
) => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message:
        "Unauthorized: You don't have permission to perform this action!",
    };
  }

  try {
    await prisma.libraryItem.delete({
      where: {
        id: libraryId,
        userId: session.user.id,
      },
    });
  } catch {
    return {
      success: false,
      message: "Unable to delete the library item. Please try again.",
    };
  }

  updateTag(`library-${session.user.id}`);
  updateTag(`collections-${session.user.id}`);
  updateTag(`tags-${session.user.id}`);
  if (!isControlled) {
    redirect(`/library`);
  }
};

export const enrichLibraryItemAction = async (libraryItemId: string) => {
  const session = await getSession();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized: You must be logged in to enrich items.",
    };
  }

  // 1. Fetch item from database
  const item = await prisma.libraryItem.findUnique({
    where: {
      id: libraryItemId,
      userId: session.user.id,
    },
    include: {
      libraryItemTags: { include: { tag: true } },
    },
  });

  if (!item) {
    return {
      success: false,
      message: "Library item not found.",
    };
  }

  try {
    // 2. Call AI enrichment service
    const enriched = await generateContentEnrichment(item.title, item.content);

    // 3. Format the summary and key takeaways into markdown
    const formattedSummary = [
      enriched.summary,
      "",
      "### Key Takeaways",
      ...enriched.keyTakeaways.map((point) => `- ${point}`),
    ].join("\n");

    // 4. Save summary and sync tags in a transaction
    await prisma.$transaction(async (tx) => {
      // Update item summary
      await tx.libraryItem.update({
        where: { id: libraryItemId },
        data: { summary: formattedSummary },
      });

      // Upsert each tag and connect it to this item
      for (const tagName of enriched.tags) {
        // 1. Find or create the tag (setting update: { name: tagName } ensures PostgreSQL always returns the row and ID)
        const tag = await tx.tag.upsert({
          where: {
            userId_name: {
              userId: session.user.id,
              name: tagName,
            },
          },
          update: {
            name: tagName, // <-- Fix: Guarantees tag.id is always returned even if tag exists
          },
          create: {
            name: tagName,
            userId: session.user.id,
          },
        });
        // 2. Link tag to library item if tag.id exists
        if (tag?.id) {
          const existingLink = await tx.libraryItemTag.findUnique({
            where: {
              libraryItemId_tagId: {
                libraryItemId,
                tagId: tag.id,
              },
            },
          });
          if (!existingLink) {
            await tx.libraryItemTag.create({
              data: {
                libraryItemId,
                tagId: tag.id,
              },
            });
          }
        }
      }
    });

    // 5. Invalidate caches so the UI refreshes instantly
    updateTag(`library-${session.user.id}`);
    updateTag(`library-detail-${session.user.id}-${libraryItemId}`);
    updateTag(`tags-${session.user.id}`);
    return {
      success: true,
      message: "Item enriched successfully with AI summary and tags!",
    };
  } catch (error: unknown) {
    console.error("AI Enrichment Error:", error);
    return {
      success: false,
      message:
        (error as { message: string }).message ||
        "Failed to generate AI enrichment.",
    };
  }
};
