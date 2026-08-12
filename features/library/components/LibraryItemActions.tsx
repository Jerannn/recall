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

interface LibraryItemActionsProps {
  id: string;
}

export default function LibraryItemActions({ id }: LibraryItemActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <EllipsisVertical />
          </Button>
        }
      />
      <DropdownMenuContent>
        <Link href={`library/${id}`}>
          <DropdownMenuItem>
            <Summary />
            View
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <FilePenLine />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
