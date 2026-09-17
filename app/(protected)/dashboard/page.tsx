import Header from "@/components/layout/Header";
import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col">
      <Header
        title="Dashboard"
        description="Spaced repetition & recall overview"
      />

      <Suspense
        fallback={
          <div className="p-6 text-xs text-muted-foreground">
            Loading dashboard...
          </div>
        }
      >
        <DashboardContainer />
      </Suspense>
    </div>
  );
}
