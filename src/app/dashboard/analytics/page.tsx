import { Download } from "lucide-react";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Analytics
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Track revenue, bookings, users and turf performance insights.
          </p>
        </div>

        <Link
  href="/dashboard/reports"
  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
>
  <Download size={18} />
  Export Report
</Link>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}