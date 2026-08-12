import { getSession } from "@/lib/get-session";
import { getLibraryFormOptions } from "../queries";
import LibraryForm from "./LibraryForm";

export default async function LibraryFormContainer() {
  const session = await getSession();
  const { collections, tags } = await getLibraryFormOptions(session?.user.id);

  return <LibraryForm collections={collections} tags={tags} mode="create" />;
}
