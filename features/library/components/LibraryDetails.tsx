import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/get-session";
import { Sparkles } from "lucide-react";
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
      collection: true,
    },
  });

  // TODO: Apply a empty message UI
  if (libraryItems.length === 0) return null;

  const item = libraryItems[0];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{item.title}</CardTitle>
          <div className="flex items-center gap-2">
            {item.libraryItemTags.map((t) => (
              <Badge variant="secondary" key={t.tag.id}>
                {t.tag.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {item.summary && (
            <div className="rounded-lg border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-900/40 dark:bg-purple-950/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-900 dark:text-purple-200">
                <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span>AI Summary & Key Takeaways</span>
              </div>
              <div className="prose prose-sm max-w-none leading-relaxed text-foreground dark:prose-invert">
                <ReactMarkdown>{item.summary}</ReactMarkdown>
              </div>
            </div>
          )}

          <div className="prose max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-base prose-p:text-sm prose-p:leading-7 prose-a:font-medium prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:wrap-break-word prose-code:whitespace-pre-wrap prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:wrap-break-word prose-pre:whitespace-pre-wrap prose-ul:text-sm">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
