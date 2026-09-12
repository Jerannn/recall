import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/get-session";
import { BookOpen, CheckCircle2, Flame, Trophy } from "lucide-react";
import { getDashboardData } from "../queries";
import RecallCard from "./RecallCard";

export default async function DashboardContainer() {
  const session = await getSession();
  const { dueItems, stats } = await getDashboardData(
    session?.user.id as string,
  );
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Due For Recall Today
            </CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dueCount}</div>
            <p className="text-xs text-muted-foreground">
              Items waiting for review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Reviewed Today
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reviewedTodayCount}</div>
            <p className="text-xs text-muted-foreground">Reviews completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Mastered Knowledge
            </CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.masteredCount}</div>
            <p className="text-xs text-muted-foreground">Retained long-term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Library Size
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Saved articles & notes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Daily Recall Queue
          </h2>
          <p className="text-xs text-muted-foreground">
            Review these items to prevent forgetting what you learned.
          </p>
        </div>
        {dueItems.length === 0 ? (
          <Card className="border-dashed bg-muted/20 p-8 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-500" />
            <p className="text-sm font-semibold">
              You are all caught up for today!
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Check back tomorrow for your next batch of recall reviews.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {dueItems.map((item) => (
              <RecallCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
