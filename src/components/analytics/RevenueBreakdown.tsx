"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { analyticsData } from "@/data/analytics";

const COLORS = ["#0ACF65", "#3B82F6", "#F59E0B"];

const bookingMap: Record<string, number> = {
  Football: 125,
  Cricket: 86,
  Badminton: 43,
};

export default function RevenueBreakdown() {
  const total = analyticsData.revenueBreakdown.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-xl font-black text-slate-950">
          Revenue Breakdown
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Revenue share by sport type
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[240px,1fr] md:items-center">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analyticsData.revenueBreakdown}
                dataKey="revenue"
                nameKey="type"
                innerRadius={64}
                outerRadius={96}
                paddingAngle={5}
              >
                {analyticsData.revenueBreakdown.map((item, index) => (
                  <Cell
                    key={item.type}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
                contentStyle={{
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {analyticsData.revenueBreakdown.map((item, index) => {
            const percentage = Math.round((item.revenue / total) * 100);

            return (
              <div
                key={item.type}
                className="flex items-center justify-between rounded-3xl bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />

                  <div>
                    <p className="text-sm font-black text-slate-950">
                      {item.type}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {bookingMap[item.type]} bookings · {percentage}% share
                    </p>
                  </div>
                </div>

                <p className="text-sm font-black text-emerald-600">
                  ₹{item.revenue.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}