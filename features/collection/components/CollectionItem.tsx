import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { EllipsisVertical, FilePenLine, Trash2 } from "lucide-react";
import { Collection } from "../types";

interface CollectionItemProps {
  collection: Collection;
}

export default function CollectionItem({ collection }: CollectionItemProps) {
  return (
    <Item key={collection.id} variant="outline">
      <ItemMedia
        variant="icon"
        className="size-4 rounded-xs"
        style={{ backgroundColor: `${collection.color}33` }}
      >
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: collection.color }}
        ></div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{collection.name}</ItemTitle>
        <ItemDescription>{collection.description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          size="icon-xs"
          variant="ghost"
          className="text-muted-foreground"
        >
          {collection.items}
        </Button>
      </ItemActions>

      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-xs",
                })}
              >
                <EllipsisVertical className="h-4 w-4" />
              </button>
            }
          />

          <DropdownMenuContent>
            <DropdownMenuItem>
              <FilePenLine />
              Edit
            </DropdownMenuItem>

            {/* NOTE: You can't delete the collection if it has an items belongs to it */}
            <DropdownMenuItem variant="destructive">
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}
