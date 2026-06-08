"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { analyticsData } from "@/data/analytics";

export default function BookingChart() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Booking Analytics
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Booking volume by month
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
          +12%
        </span>
      </div>

      <div className="mt-8 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={analyticsData.bookingChart}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 0,
            }}
            barCategoryGap="28%"
          >
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
                fill: "rgba(10, 207, 101, 0.08)",
                radius: 16,
              }}
              formatter={(value) => [
                `${value} bookings`,
                "Bookings",
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

            <Bar
              dataKey="bookings"
              fill="#0ACF65"
              radius={[16, 16, 16, 16]}
              barSize={42}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}