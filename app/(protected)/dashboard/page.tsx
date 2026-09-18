import Header from "@/components/layout/Header";
import LoadingText from "@/components/LoadingText";
import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col">
      <Header
        title="Dashboard"
        description="Spaced repetition & recall overview"
      />

      <Suspense fallback={<LoadingText resource="dashboard" />}>
        <DashboardContainer />
      </Suspense>
    </div>
  );
}
