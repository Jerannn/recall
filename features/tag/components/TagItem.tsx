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
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Tag as TagIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteTag } from "../actions";
import { Tag } from "../types";

interface TagItemProps {
  tag: Tag;
}

export default function TagItem({ tag }: TagItemProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const onDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const result = await deleteTag(tag.id);

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
    <Item key={tag.id} variant="outline">
      <ItemMedia variant="icon">
        <TagIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{tag.name}</ItemTitle>
      </ItemContent>

      <ItemActions>
        {/* NOTE: You can't delete the tag if it has an items belongs to it */}
        <Button variant="outline" size="icon-xs" onClick={() => setOpen(true)}>
          <Trash2 />
        </Button>

        {/* TODO: separate it to its own component */}
        {tag.items > 0 ? (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Notice</AlertDialogTitle>
                <AlertDialogDescription>
                  You can&apos;t delete this tag because it has an item that are
                  belongs to it
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
