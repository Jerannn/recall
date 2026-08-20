import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { getSession } from "@/lib/get-session";
import { getCollections } from "../queries";

export default async function CollectionList() {
  const session = await getSession();
  const collections = await getCollections(session?.user.id as string);
  console.log(collections);

  if (collections.length === 0) {
    // TODO: add a proper message with action
    return <p>No collections, please add</p>;
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {collections.map((item) => (
        <Item key={item.id} variant="outline">
          <ItemMedia
            variant="icon"
            className="size-4 rounded-xs"
            style={{ backgroundColor: `${item.color}33` }}
          >
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemDescription>{item.description}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              size="icon"
              variant="outline"
              className="text-muted-foreground"
            >
              {item.items}
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
