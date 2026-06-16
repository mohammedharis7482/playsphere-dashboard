"use client";

import useSWR from "swr";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RevenueItem = {
  day: string;
  revenue: number;
};

type DashboardResponse = {
  success: boolean;
  revenueChart: RevenueItem[];
};

export default function RevenueChart() {
  const { data, isLoading, error } =
    useSWR<DashboardResponse>("/api/dashboard");

  const revenueData = data?.revenueChart ?? [];

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Weekly booking revenue performance.
          </p>
        </div>

        <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-700">
          Cached Live
        </span>
      </div>

      <div className="h-[320px] w-full min-w-0">
        {isLoading ? (
          <div className="h-full w-full animate-pulse rounded-2xl bg-slate-100" />
        ) : error || !data?.success ? (
          <div className="flex h-full items-center justify-center rounded-2xl bg-red-50 text-sm font-bold text-red-600">
            Failed to load revenue chart.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient
                  id="dashboardRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#dashboardRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}