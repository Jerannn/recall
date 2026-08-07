import { z } from "zod";

export const librarySchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  source: z
    .string()
    .min(1, "Source is required.")
    .max(50, "Source must not exceed 50 characters."),
  tags: z.array(z.string()).min(1, "Please select at least one tag."),
  collection: z.string().min(1, "Please select a collection."),
  url: z.url("Invalid URL format.").optional().or(z.literal("")),
});
