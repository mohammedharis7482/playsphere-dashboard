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

export default function PeakHoursChart() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">
        Peak Booking Hours
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Most active hours by bookings
      </p>

      <div className="mt-8 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analyticsData.peakHours}>
            <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis dataKey="hour" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="bookings" fill="#0ACF65" radius={[14, 14, 14, 14]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}