import {
  CalendarDays,
  IndianRupee,
  Star,
  Users,
} from "lucide-react";

import { dashboardStats } from "@/data/dashboardData";

const icons = [
  IndianRupee,
  CalendarDays,
  Users,
  Star,
];

export default function StatsOverview() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat, index) => {
        const Icon = icons[index];

        return (
          <div
            key={stat.title}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  {stat.value}
                </h3>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                    {stat.growth}
                  </span>

                  <span className="text-xs font-semibold text-slate-500">
                    {stat.note}
                  </span>
                </div>
              </div>

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.color}`}
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