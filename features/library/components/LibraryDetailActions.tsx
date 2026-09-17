import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import Link from "next/link";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import EnrichAIButton from "./EnrichAIButton";

interface LibraryDetailActionsProps {
  libraryId: string;
}

export default function LibraryDetailActions({
  libraryId,
}: LibraryDetailActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <EnrichAIButton libraryId={libraryId} />

      <Link href={`/library/${libraryId}/edit`}>
        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
          <Edit3 className="h-3.5 w-3.5" />
          <span>Edit</span>
        </Button>
      </Link>

      <ConfirmDeleteDialog libraryId={libraryId} />
    </div>
  );
}
