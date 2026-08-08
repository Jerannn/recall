import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import ReactMarkdown from "react-markdown";

interface LibraryDetailsProps {
  id: string;
}

export default async function LibraryDetails({ id }: LibraryDetailsProps) {
  const session = await getSession();
  const libraryItems = await prisma.libraryItem.findMany({
    where: {
      id,
      userId: session?.user.id,
    },
    include: {
      libraryItemTags: { include: { tag: true } },
      libraryCollections: true,
    },
  });

  if (libraryItems.length === 0) return null;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{libraryItems[0].title}</CardTitle>
          <div className="flex items-center gap-2">
            {libraryItems[0].libraryItemTags.map((item) => (
              <Badge variant="secondary" key={item.tag.id}>
                {item.tag.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <ReactMarkdown>{libraryItems[0].content}</ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
}
