import {
  CalendarDays,
  IndianRupee,
  TrendingUp,
  Users,
} from "lucide-react";

import { analyticsData } from "@/data/analytics";

export default function AnalyticsStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: `₹${(analyticsData.totalRevenue / 100000).toFixed(1)}L`,
      icon: IndianRupee,
      growth: "+18.2%",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Bookings",
      value: analyticsData.totalBookings.toLocaleString(),
      icon: CalendarDays,
      growth: "+12.4%",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Users",
      value: analyticsData.totalUsers.toLocaleString(),
      icon: Users,
      growth: "+9.1%",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Growth",
      value: `+${analyticsData.revenueGrowth}%`,
      icon: TrendingUp,
      growth: "This month",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  {item.value}
                </h3>

                <p className="mt-4 text-xs font-black text-emerald-600">
                  {item.growth}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}