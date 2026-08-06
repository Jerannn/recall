import { z } from "zod";
import { librarySchema } from "./schema";

export type LibraryInput = z.infer<typeof librarySchema>;
