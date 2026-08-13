import { Button } from "@/components/ui/button";
import Link from "next/link";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface LibraryDetailActionsProps {
  params: Promise<{ libraryId: string }>;
}

export default async function LibraryDetailActions({
  params,
}: LibraryDetailActionsProps) {
  const { libraryId } = await params;

  return (
    <div className="space-x-3">
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
