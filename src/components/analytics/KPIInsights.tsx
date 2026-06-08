import {
  Activity,
  CalendarDays,
  IndianRupee,
  TrendingUp,
  Users,
} from "lucide-react";

import { analyticsData } from "@/data/analytics";

export default function KPIInsights() {
  const items = [
    {
      title: "Revenue Growth",
      value: `${analyticsData.revenueGrowth}%`,
      note: "+4.2% vs last month",
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Booking Growth",
      value: `${analyticsData.bookingGrowth}%`,
      note: "+3.8% vs last month",
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Users",
      value: analyticsData.activeUsers,
      note: "+26 new users",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Avg Booking Value",
      value: `₹${analyticsData.averageBookingValue}`,
      note: "+₹84 increase",
      icon: IndianRupee,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Turf Utilization",
      value: `${analyticsData.turfUtilization}%`,
      note: "Healthy usage",
      icon: Activity,
      color: "bg-cyan-50 text-cyan-600",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
            >
              <Icon size={21} />
            </div>

            <h3 className="mt-5 text-2xl font-black text-slate-950">
              {item.value}
            </h3>

            <p className="mt-1 text-sm font-bold text-slate-500">
              {item.title}
            </p>

            <p className="mt-3 text-xs font-black text-emerald-600">
              {item.note}
            </p>
          </div>
        );
      })}
    </div>
  );
}