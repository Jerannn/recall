import { getSession } from "@/lib/get-session";
import { getTags } from "../queries";
import TagItem from "./TagItem";

export default async function TagList() {
  const session = await getSession();
  const tags = await getTags(session?.user.id as string);

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </div>
  );
}
