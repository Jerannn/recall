import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getLibraryFormOptions, getLibraryItem } from "../queries";
import LibraryForm from "./LibraryForm";

interface LibraryEditFormProps {
  params: Promise<{ libraryId: string }>;
}

export default async function LibraryEditForm({
  params,
}: LibraryEditFormProps) {
  const { libraryId } = await params;
  const session = await getSession();
  const { collections, tags } = await getLibraryFormOptions(session?.user.id);
  const { libraryItems } = await getLibraryItem(session?.user.id, libraryId);

  if (libraryItems.length === 0) redirect("/library");

  return (
    <LibraryForm
      collections={collections}
      tags={tags}
      mode="update"
      initialState={libraryItems[0]}
    />
  );
}
