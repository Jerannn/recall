"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { librarySchema } from "./schema";
import { LibraryFormState } from "./types";

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
    collection: formData.get("collection") as string,
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
        title: rawFields.title,
        content: rawFields.content,
        source: rawFields.source,
        url: rawFields.url,
        userId: session.user.id,
      },
    });

    await tx.libraryCollection.create({
      data: {
        libraryItemId: data.id,
        collectionId: rawFields.collection,
      },
    });

    await Promise.all(
      rawFields.tags.map((tag) =>
        tx.libraryItemTag.create({
          data: { libraryItemId: data.id, tagId: tag },
        }),
      ),
    );

    return data;
  });

  if (!libraryItem) {
    return {
      success: false,
      message: "Unable to create the library item. Please try again.",
    };
  }
  updateTag(`library-${session.user.id}`);
  redirect(`/library/${libraryItem.id}`);
};
