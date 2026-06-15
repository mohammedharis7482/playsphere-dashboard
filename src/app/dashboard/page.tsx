import Link from "next/link";
import { FileText } from "lucide-react";

import StatsOverview from "@/components/dashboard/StatsOverview";
import RevenueChart from "@/components/dashboard/RevenueChart";
import QuickActions from "@/components/dashboard/QuickActions";
import BusinessModules from "@/components/dashboard/BusinessModules";
import OperationsSummary from "@/components/dashboard/OperationsSummary";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import AvailabilityCard from "@/components/dashboard/AvailabilityCard";
import ReviewsPreview from "@/components/dashboard/ReviewsPreview";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Dashboard
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Welcome back to PlaySphere Admin Panel.
          </p>
        </div>

        <Link
          href="/dashboard/reports"
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
        >
          <FileText size={18} />
          Generate Report
        </Link>
      </div>

      <StatsOverview />

      <div className="grid gap-6 xl:grid-cols-[1fr,380px]">
        <RevenueChart />
        <OperationsSummary />
      </div>

      <QuickActions />

      <BusinessModules />

      <div className="grid gap-6 xl:grid-cols-[1fr,380px]">
        <ActivityFeed />
        <ReviewsPreview />
      </div>

      <AvailabilityCard />
    </div>
  );
}