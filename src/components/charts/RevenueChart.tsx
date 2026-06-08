"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 25000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 31000 },
  { month: "Jun", revenue: 42000 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Revenue Analytics
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Monthly revenue growth
      </p>

      <div className="mt-6 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0ACF65"
              fill="#0ACF65"
              fillOpacity={0.15}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}