import { Activity, CalendarDays, IndianRupee, Trophy } from "lucide-react";
import { Turf } from "@/types/turf";

interface Props {
  turfs: Turf[];
}

export default function TurfStats({ turfs }: Props) {
  const total = turfs.length;
  const active = turfs.filter((turf) => turf.status === "ACTIVE").length;
  const bookings = turfs.reduce((sum, turf) => sum + turf.bookings, 0);
  const revenue = turfs.reduce((sum, turf) => sum + turf.revenue, 0);

  const stats = [
    {
      title: "Total Turfs",
      value: total,
      icon: Trophy,
      color: "bg-blue-50 text-blue-600",
      growth: "+8.2%",
    },
    {
      title: "Active Turfs",
      value: active,
      icon: Activity,
      color: "bg-emerald-50 text-emerald-600",
      growth: "+12.4%",
    },
    {
      title: "Bookings",
      value: bookings,
      icon: CalendarDays,
      color: "bg-orange-50 text-orange-600",
      growth: "+18.7%",
    },
    {
      title: "Revenue",
      value: `₹${revenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-purple-50 text-purple-600",
      growth: "+21.3%",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                  {stat.value}
                </h3>

                <p className="mt-4 text-xs font-black text-emerald-600">
                  {stat.growth} this month
                </p>
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