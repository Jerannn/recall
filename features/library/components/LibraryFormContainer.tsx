import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import LibraryForm from "./LibraryForm";

export default async function LibraryFormContainer() {
  const session = await getSession();
  const [collections, tags] = await Promise.all([
    prisma.collection.findMany({
      where: {
        userId: session?.user.id,
      },
    }),
    prisma.tag.findMany({
      where: {
        userId: session?.user.id,
      },
    }),
  ]);
  return <LibraryForm collections={collections} tags={tags} />;
}
