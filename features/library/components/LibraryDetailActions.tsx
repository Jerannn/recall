import { Button } from "@/components/ui/button";
import Link from "next/link";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import EnrichAIButton from "./EnrichAIButton";

interface LibraryDetailActionsProps {
  params: Promise<{ libraryId: string }>;
}

export default async function LibraryDetailActions({
  params,
}: LibraryDetailActionsProps) {
  const { libraryId } = await params;

  return (
    <div className="flex items-center gap-3">
      <EnrichAIButton libraryId={libraryId} />

      <Button
        variant="outline"
        render={<Link href={`${libraryId}/edit`} />}
        nativeButton={false}
      >
        Edit
      </Button>

      <ConfirmDeleteDialog libraryId={libraryId} />
    </div>
  );
}
