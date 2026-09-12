import Header from "@/components/layout/Header";
import DashboardContainer from "@/features/dashboard/components/DashboardContainer";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <Header title="Dashboard" />

      <Suspense fallback={<div>Loading dashboard...</div>}>
        <DashboardContainer />
      </Suspense>
    </div>
  );
}
