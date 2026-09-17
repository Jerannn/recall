import { getSession } from "@/lib/get-session";
import { Tag as TagIcon } from "lucide-react";
import { getTags } from "../queries";
import TagItem from "./TagItem";

export default async function TagList() {
  const session = await getSession();
  const tags = await getTags(session?.user.id as string);

  if (tags.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/10 p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
          <TagIcon className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          No tags created yet
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm">
          Type a tag name above to organize your knowledge items by keyword or topic.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </div>
  );
}
