"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { updateTag } from "next/cache";
import { tagSchema } from "./schema";
import { TagFormState } from "./types";

export const createTag = async (
  prevState: TagFormState,
  formData: FormData,
): Promise<TagFormState> => {
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
  };

  const result = tagSchema.safeParse(rawFields);

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

  const newTag = await prisma.tag.create({
    data: {
      name: result.data.name,
      userId: session.user.id,
    },
  });

  if (!newTag) {
    return {
      success: false,
      message: "Unable to create the tag. Please try again.",
    };
  }

  updateTag(`tags-${session.user.id}`);
  updateTag(`library-form-options-${session.user.id}`);

  return {
    success: true,
    message: "Tag successfully created!",
  };
};

export const deleteTag = async (tagId: string) => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message:
        "Unauthorized: You don't have permission to perform this action!",
    };
  }

  try {
    await prisma.tag.delete({
      where: {
        id: tagId,
        userId: session.user.id,
      },
    });
  } catch {
    return {
      success: false,
      message: "Unable to delete the tag item. Please try again.",
    };
  }

  updateTag(`tags-${session.user.id}`);
  updateTag(`library-form-options-${session.user.id}`);
};
