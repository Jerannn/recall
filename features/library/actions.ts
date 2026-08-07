"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
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
  console.log(rawFields);
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

  try {
    const data = await prisma.libraryItem.create({
      data: {
        title: rawFields.title,
        content: rawFields.content,
        source: rawFields.source,
        url: rawFields.url,
        userId: session.user.id,
      },
    });

    console.log(data);

    return {
      success: true,
      message: "Library item created successfully!",
    };
  } catch (error: unknown) {
    console.error("Failed to create library item:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
