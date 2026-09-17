import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/get-session";
import { BookOpen, CheckCircle2, Flame, Trophy } from "lucide-react";
import { getDashboardData } from "../queries";
import DashboardQueue from "./DashboardQueue";

export default async function DashboardContainer() {
  const session = await getSession();
  const { dueItems, stats } = await getDashboardData(
    session?.user.id as string,
  );

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/* 4-Metric Clean Ribbon */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {/* Due For Recall */}
        <Card className="border-border/60 shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Due Today
              </p>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stats.dueCount}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Waiting for review
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
              <Flame className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Reviewed Today */}
        <Card className="border-border/60 shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Reviewed Today
              </p>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stats.reviewedTodayCount}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Completed today
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Mastered Knowledge */}
        <Card className="border-border/60 shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Mastered
              </p>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stats.masteredCount}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Retained long-term
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <Trophy className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Total Library */}
        <Card className="border-border/60 shadow-xs">
          <CardContent className="p-4 sm:p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Total Library
              </p>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stats.totalItems}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Saved items
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spaced Repetition Queue */}
      <DashboardQueue dueItems={dueItems} />
    </div>
  );
}
