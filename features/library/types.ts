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

export type LibraryQueryParams = {
  page: string | undefined;
  pageSize: string;
  source: string;
  tag: string;
  search: string;
};

export type InitialStateForm = {
  readonly id?: string;
  title: string;
  content: string;
  source: string;
  tags: string[];
  collectionId: string;
  url: string | null;
};
