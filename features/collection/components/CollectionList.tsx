import { getSession } from "@/lib/get-session";
import { getCollections } from "../queries";
import CollectionItem from "./CollectionItem";

export default async function CollectionList() {
  const session = await getSession();
  const collections = await getCollections(session?.user.id as string);

  if (collections.length === 0) {
    // TODO: add a proper message with action
    return <p>No collections, please add</p>;
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {collections.map((item) => (
        <CollectionItem key={item.id} collection={item} />
      ))}
    </div>
  );
}
