"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { updateTag } from "next/cache";
import { collectionSchema } from "./schema";
import { CollectionFormState } from "./types";

export const createCollection = async (
  prevState: CollectionFormState,
  formData: FormData,
): Promise<CollectionFormState> => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message:
        "Unauthorized: You don't have permission to perform this action!",
    };
  }

  const rawFields = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    color: formData.get("color") as string,
  };

  const result = collectionSchema.safeParse(rawFields);

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

  const newCollection = await prisma.collection.create({
    data: {
      name: result.data.name,
      description: result.data.description,
      color: result.data.color,
      userId: session.user.id,
    },
  });

  if (!newCollection) {
    return {
      success: false,
      message: "Unable to create the collection. Please try again.",
    };
  }

  updateTag(`collections-${session.user.id}`);
  updateTag(`library-form-options-${session.user.id}`);

  return {
    success: true,
    message: "Collection successfully created!",
  };
};

export const deleteCollection = async (collectionId: string) => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message:
        "Unauthorized: You don't have permission to perform this action!",
    };
  }

  try {
    await prisma.collection.delete({
      where: {
        id: collectionId,
        userId: session.user.id,
      },
    });
  } catch {
    return {
      success: false,
      message: "Unable to delete the collection item. Please try again.",
    };
  }

  updateTag(`collections-${session.user.id}`);
  updateTag(`library-form-options-${session.user.id}`);
};
