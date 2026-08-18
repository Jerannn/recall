import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";

const collections = [
  {
    id: "cmswux35c0000356try6tz0to",
    name: "Web Development",
    description: "Resources and references related to modern web development.",
    color: "#3B82F6",
    userId: "user-id",
  },
  {
    id: "cmswuxktl0001356tvw08pe9p",
    name: "JavaScript",
    description: "Articles, tutorials, and documentation about JavaScript.",
    color: "#F59E0B",
    userId: "user-id",
  },
  {
    id: "cmswuxn820002356tp18hl65t",
    name: "TypeScript",
    description: "Useful TypeScript resources, patterns, and best practices.",
    color: "#3178C6",
    userId: "user-id",
  },
  {
    id: "cmswuxpjb0003356txagn1qax",
    name: "React",
    description:
      "React tutorials, documentation, patterns, and useful references.",
    color: "#06B6D4",
    userId: "user-id",
  },
  {
    id: "cmswuxrzo0004356t88wq3qd9",
    name: "Next.js",
    description: "Next.js documentation, tutorials, and implementation guides.",
    color: "#171717",
    userId: "user-id",
  },
  {
    id: "cmswuxvlo0005356tvl7gb5yj",
    name: "Database",
    description:
      "Database concepts, SQL, PostgreSQL, Prisma, and data modeling.",
    color: "#8B5CF6",
    userId: "user-id",
  },
  {
    id: "cmswuxy6s0006356txuut9v59",
    name: "Backend Development",
    description:
      "Backend architecture, APIs, authentication, and server-side development.",
    color: "#10B981",
    userId: "user-id",
  },
  {
    id: "cmswuy0ot0007356tve0t1a9p",
    name: "UI & UX",
    description:
      "Design inspiration, UI patterns, accessibility, and UX resources.",
    color: "#EC4899",
    userId: "user-id",
  },
  {
    id: "cmswuy3xd0008356trd3pmdkk",
    name: "Career & Learning",
    description:
      "Resources for improving technical skills and advancing your career.",
    color: "#F97316",
    userId: "user-id",
  },
  {
    id: "cmswuy60e0009356tig7j8pfw",
    name: "Useful References",
    description:
      "General references, tools, documentation, and resources worth keeping.",
    color: "#6366F1",
    userId: "user-id",
  },
];

export default function CollectionsPage() {
  return (
    <div>
      <Header
        title="Collections"
        actions={
          <Link href="/collections">
            <Button>Add new collection</Button>
          </Link>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((item) => (
          <Item key={item.id} variant="outline">
            <ItemMedia
              variant="icon"
              className="size-4 rounded-xs"
              style={{ backgroundColor: `${item.color}33` }}
            >
              <div
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{item.name}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                size="icon"
                variant="outline"
                className="text-muted-foreground"
              >
                12
              </Button>
            </ItemActions>
          </Item>
        ))}
      </div>
    </div>
  );
}
