import {
  BarChart3,
  Gauge,
  Percent,
  TrendingUp,
} from "lucide-react";

import { Turf } from "@/types/turf";

interface Props {
  turfs: Turf[];
}

export default function TurfAnalytics({ turfs }: Props) {
  const averageOccupancy =
    turfs.length > 0
      ? Math.round(
          turfs.reduce((sum, turf) => sum + turf.occupancy, 0) /
            turfs.length
        )
      : 0;

  const averageAvailability =
    turfs.length > 0
      ? Math.round(
          turfs.reduce((sum, turf) => sum + turf.availability, 0) /
            turfs.length
        )
      : 0;

  const topRevenue = Math.max(...turfs.map((turf) => turf.revenue), 0);

  const analytics = [
    {
      title: "Avg Occupancy",
      value: `${averageOccupancy}%`,
      icon: Gauge,
      color: "bg-blue-50 text-blue-600",
      note: "Overall turf usage",
    },
    {
      title: "Avg Availability",
      value: `${averageAvailability}%`,
      icon: Percent,
      color: "bg-emerald-50 text-emerald-600",
      note: "Available booking slots",
    },
    {
      title: "Top Revenue",
      value: `₹${topRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
      note: "Highest earning turf",
    },
    {
      title: "Performance Score",
      value: "92%",
      icon: BarChart3,
      color: "bg-purple-50 text-purple-600",
      note: "Operational health",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {analytics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={21} />
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                Live
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-black text-slate-950">
              {item.value}
            </h3>

            <p className="mt-1 text-sm font-bold text-slate-700">
              {item.title}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {item.note}
            </p>
          </div>
        );
      })}
    </div>
  );
}