import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  Trophy,
} from "lucide-react";

const modules = [
  {
    title: "Booking Management",
    desc: "Manage reservations, schedules and booking status.",
    href: "/dashboard/bookings",
    icon: CalendarDays,
  },
  {
    title: "Turf Management",
    desc: "Manage turf availability, revenue and performance.",
    href: "/dashboard/turfs",
    icon: Trophy,
  },
  {
    title: "Analytics Overview",
    desc: "Track growth, revenue and platform insights.",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];

export default function BusinessModules() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {modules.map((module) => {
        const Icon = module.icon;

        return (
          <Link
            key={module.title}
            href={module.href}
            className="group rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white">
                <Icon size={22} />
              </div>

              <ChevronRight
                size={22}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-600"
              />
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-950">
              {module.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {module.desc}
            </p>
          </Link>
        );
      })}
    </div>
  );
}