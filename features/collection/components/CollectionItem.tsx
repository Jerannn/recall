"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCollection } from "../actions";
import { Collection } from "../types";

interface CollectionItemProps {
  collection: Collection;
}

export default function CollectionItem({ collection }: CollectionItemProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const onDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const result = await deleteCollection(collection.id);

      if (result?.success === false) {
        setError(result.message);
        return;
      }
      router.refresh();
      setOpen(false);
    } catch {
      setError("Can't delete this item. Something is wrong, please try again!");
    } finally {
      setIsDeleting(false);
    }
  };

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
        {/* NOTE: You can't delete the collection if it has an items belongs to it */}
        <Button variant="outline" size="icon-xs" onClick={() => setOpen(true)}>
          <Trash2 />
        </Button>

        {/* TODO: separate it to its own component */}
        {collection.items > 0 ? (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Notice</AlertDialogTitle>
                <AlertDialogDescription>
                  You can&apos;t delete this collection because it has an item
                  that are belongs to it
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  item from the servers.
                </AlertDialogDescription>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={onDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Continue"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </ItemActions>
    </Item>
  );
}
