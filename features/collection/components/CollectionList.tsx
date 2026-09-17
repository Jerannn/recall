import { getSession } from "@/lib/get-session";
import { FolderOpen } from "lucide-react";
import { getCollections } from "../queries";
import CollectionItem from "./CollectionItem";

export default async function CollectionList() {
  const session = await getSession();
  const collections = await getCollections(session?.user.id as string);

  if (collections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/10 p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
          <FolderOpen className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          No collections created yet
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm">
          Create collections like &ldquo;Engineering&rdquo;, &ldquo;Philosophy&rdquo;, or &ldquo;Research&rdquo; to categorize your knowledge.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((item) => (
        <CollectionItem key={item.id} collection={item} />
      ))}
    </div>
  );
}
