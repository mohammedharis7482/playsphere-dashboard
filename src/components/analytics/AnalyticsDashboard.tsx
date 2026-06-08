"use client";

import { useState } from "react";

import AnalyticsStats from "./AnalyticsStats";
import AnalyticsFilter from "./AnalyticsFilter";
import KPIInsights from "./KPIInsights";
import RevenueChart from "./RevenueChart";
import BookingChart from "./BookingChart";
import RevenueSummary from "./RevenueSummary";
import UserGrowth from "./UserGrowth";
import TopTurfs from "./TopTurfs";
import RecentActivity from "./RecentActivity";
import PeakHoursChart from "./PeakHoursChart";
import RevenueBreakdown from "./RevenueBreakdown";
import Link from "next/link";
import { Download } from "lucide-react";

export default function AnalyticsDashboard() {
  const [range, setRange] = useState("30 Days");

  return (
    <div className="space-y-8">
      <AnalyticsStats />

      <AnalyticsFilter range={range} setRange={setRange} />

      <KPIInsights />

      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart />
        <BookingChart />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <UserGrowth />
        </div>

        <RevenueSummary />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PeakHoursChart />
        <RevenueBreakdown />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <TopTurfs />
        <RecentActivity />
      </div>
    </div>
  );
}