import { z } from "zod";
import { librarySchema } from "./schema";

export type LibraryInput = z.infer<typeof librarySchema>;

export type LibraryFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export type TagOption = {
  id: string;
  name: string;
};
export type CollectionOption = {
  id: string;
  name: string;
};
