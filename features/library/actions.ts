"use server";

import { librarySchema } from "./schema";

type LibraryFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export const createLibrary = async (
  prevState: LibraryFormState,
  formData: FormData,
): Promise<LibraryFormState> => {
  const data = Object.fromEntries(formData.entries());

  const fields = {
    title: data.title as string,
    content: data.content as string,
    source: data.source as string,
    tags: data.tags as string,
    collection: data.collection as string,
    url: data.url as string,
  };

  const result = librarySchema.safeParse(fields);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((error) => {
      errors[error.path[0] as string] = error.message;
    });

    return {
      success: false,
      message: "Validation errors",
      errors: errors,
    };
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      success: true,
      message: "Library is created successfully!",
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
