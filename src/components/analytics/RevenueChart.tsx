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

export default function RevenueChart() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Revenue Trend
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Monthly revenue performance
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          +18%
        </span>
      </div>

      <div className="mt-8 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={analyticsData.revenueChart}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#0ACF65"
                  stopOpacity={0.32}
                />
                <stop
                  offset="55%"
                  stopColor="#0ACF65"
                  stopOpacity={0.12}
                />
                <stop
                  offset="100%"
                  stopColor="#0ACF65"
                  stopOpacity={0}
                />
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
              tick={{
                fill: "#64748B",
                fontSize: 12,
                fontWeight: 700,
              }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94A3B8",
                fontSize: 12,
                fontWeight: 600,
              }}
            />

            <Tooltip
              cursor={{
                stroke: "#0ACF65",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
              contentStyle={{
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
              }}
              labelStyle={{
                color: "#0F172A",
                fontWeight: 800,
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0ACF65"
              strokeWidth={4}
              fill="url(#revenueGradient)"
              dot={{
                r: 5,
                stroke: "#ffffff",
                strokeWidth: 3,
                fill: "#0ACF65",
              }}
              activeDot={{
                r: 8,
                stroke: "#ffffff",
                strokeWidth: 3,
                fill: "#0ACF65",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}