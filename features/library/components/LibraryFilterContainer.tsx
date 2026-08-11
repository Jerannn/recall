import { getSession } from "@/lib/get-session";
import { getFilterOptions } from "../queries";
import LibraryFilter from "./LibraryFilter";

export default async function LibraryFilterContainer() {
  const session = await getSession();
  const { sourceList, tagList } = await getFilterOptions(session?.user.id);

  return <LibraryFilter sourceList={sourceList} tagList={tagList} />;
}
