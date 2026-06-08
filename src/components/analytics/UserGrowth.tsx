"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { analyticsData } from "@/data/analytics";

export default function UserGrowth() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            User Growth
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Registered user growth over time
          </p>
        </div>

        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-black text-purple-700">
          +9%
        </span>
      </div>

      <div className="mt-8 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={analyticsData.userGrowthChart}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="userAnalyticsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.24} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#E2E8F0"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12, fontWeight: 700 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 600 }}
            />

            <Tooltip
              formatter={(value) => [`${value} users`, "Users"]}
              contentStyle={{
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#8B5CF6"
              strokeWidth={4}
              fill="url(#userAnalyticsGradient)"
              dot={{
                r: 4,
                stroke: "#fff",
                strokeWidth: 2,
                fill: "#8B5CF6",
              }}
              activeDot={{
                r: 7,
                stroke: "#fff",
                strokeWidth: 3,
                fill: "#8B5CF6",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}