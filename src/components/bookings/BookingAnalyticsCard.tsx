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

const bookingTrendData = [
  {
    month: "Jan",
    bookings: 28,
  },
  {
    month: "Feb",
    bookings: 35,
  },
  {
    month: "Mar",
    bookings: 48,
  },
  {
    month: "Apr",
    bookings: 44,
  },
  {
    month: "May",
    bookings: 67,
  },
  {
    month: "Jun",
    bookings: 82,
  },
];

export default function BookingAnalyticsCard() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Booking Trends
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Monthly booking growth overview
          </p>
        </div>

        <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
          +24.6% Growth
        </div>
      </div>

      <div className="mt-8 h-[260px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={bookingTrendData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="bookingTrendGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#0ACF65"
                  stopOpacity={0.22}
                />
                <stop
                  offset="95%"
                  stopColor="#0ACF65"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
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
              contentStyle={{
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                boxShadow:
                  "0 12px 30px rgba(15,23,42,0.08)",
              }}
              formatter={(value) => [
                `${value} bookings`,
                "Bookings",
              ]}
              labelStyle={{
                color: "#0F172A",
                fontWeight: 800,
              }}
            />

            <Area
              type="monotone"
              dataKey="bookings"
              stroke="#0ACF65"
              strokeWidth={4}
              fill="url(#bookingTrendGradient)"
              activeDot={{
                r: 7,
                stroke: "#ffffff",
                strokeWidth: 3,
                fill: "#0ACF65",
              }}
              dot={{
                r: 4,
                stroke: "#ffffff",
                strokeWidth: 2,
                fill: "#0ACF65",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}