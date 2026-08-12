import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import ReactMarkdown from "react-markdown";

interface LibraryDetailsProps {
  params: Promise<{ libraryId: string }>;
}

export default async function LibraryDetails({ params }: LibraryDetailsProps) {
  const session = await getSession();
  const { libraryId: id } = await params;
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

  // TODO: Apply a empty message UI
  if (libraryItems.length === 0) return null;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{libraryItems[0].title}</CardTitle>
          <div className="flex items-center gap-2">
            {libraryItems[0].libraryItemTags.map((item) => (
              <Badge variant="secondary" key={item.tag.id}>
                {item.tag.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-base prose-p:text-sm prose-p:leading-7 prose-a:font-medium prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-pre:rounded-lg prose-ul:text-sm">
          <ReactMarkdown>{libraryItems[0].content}</ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
}
