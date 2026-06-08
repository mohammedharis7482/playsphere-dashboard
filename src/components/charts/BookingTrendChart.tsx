"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", bookings: 10 },
  { day: "Tue", bookings: 12 },
  { day: "Wed", bookings: 8 },
  { day: "Thu", bookings: 18 },
  { day: "Fri", bookings: 25 },
  { day: "Sat", bookings: 32 },
  { day: "Sun", bookings: 28 },
];

export default function BookingTrendChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Booking Trends
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Last 7 days bookings
      </p>

      <div className="mt-6 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <Tooltip />

            <Bar
              dataKey="bookings"
              radius={[10, 10, 0, 0]}
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}