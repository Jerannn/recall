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

    await tx.libraryItemTag.createMany({
      data: rawFields.tags.map((tagId) => ({
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
    const data = await tx.libraryItem.update({
      where: {
        id: libraryItemId,
        userId: session?.user.id,
      },
      data: {
        title: rawFields.title,
        content: rawFields.content,
        source: rawFields.source,
        url: rawFields.url,
        userId: session.user.id,
      },
    });

    if (rawFields.tags.length > 0) {
      await tx.libraryItemTag.deleteMany({
        where: { libraryItemId },
      });

      await tx.libraryItemTag.createMany({
        data: rawFields.tags.map((tagId) => ({
          libraryItemId: data.id,
          tagId,
        })),
      });
    }

    if (rawFields.collection) {
      await tx.libraryCollection.deleteMany({
        where: { libraryItemId },
      });

      await tx.libraryCollection.create({
        data: {
          libraryItemId,
          collectionId: rawFields.collection,
        },
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
  redirect(`/library/${libraryItem.id}`);
};
