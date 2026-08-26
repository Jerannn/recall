import { z } from "zod";
import { collectionSchema } from "./schema";

type CollectionBase = {
  name: string;
  description: string;
  color: string;
};

export type CollectionInput = z.infer<typeof collectionSchema>;
export type Collection = CollectionBase & {
  readonly id: string;
  items: number;
};

export type InitialStateForm = CollectionBase & {
  readonly id?: string;
};

export type CollectionFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};
