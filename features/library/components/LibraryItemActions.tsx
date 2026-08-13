"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, FilePenLine, Summary, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface LibraryItemActionsProps {
  id: string;
}

export default function LibraryItemActions({ id }: LibraryItemActionsProps) {
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline">
              <EllipsisVertical />
            </Button>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuItem render={<Link href={`library/${id}`} />}>
            <Summary />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<Link href={`library/${id}/edit`} />}
            nativeButton={false}
          >
            <FilePenLine />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog
        libraryId={id}
        open={isDeleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
